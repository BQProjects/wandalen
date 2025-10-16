const ClientModel = require("../models/clientModel");
const crypto = require("crypto");
const smsStoreModel = require("../models/smsStoreModel");
const ReviewModel = require("../models/reviewModel");
const VideoModel = require("../models/videoModel");
const VideoRequestModel = require("../models/videoRequestModel");
const bcrypt = require("bcrypt");
const LikeModel = require("../models/likeModel");
const mongoose = require("mongoose");
const axios = require("axios");
const { sendEmail, emailTemplates } = require("../services/emailService");

// Improved checkAndExtendSubscription with comprehensive error handling
const checkAndExtendSubscription = async (client) => {
  try {
    // Validate input
    if (!client || !client._id) {
      throw new Error("Invalid client data provided");
    }

    // Skip if no Stripe subscription ID
    if (!client.stripeSubscriptionId) {
      console.log(`⏭️ Skipping ${client.email} - no Stripe subscription ID`);
      return { renewed: false, reason: "No Stripe subscription" };
    }

    // Check if already processed recently (prevent duplicate processing)
    const now = new Date();
    const lastChecked = client.lastRenewalCheck || new Date(0);
    const hoursSinceLastCheck = (now - lastChecked) / (1000 * 60 * 60);

    if (hoursSinceLastCheck < 1) {
      // Only check once per hour
      return { renewed: false, reason: "Recently checked" };
    }

    console.log(`🔍 Checking subscription for ${client.email}...`);

    // Fetch fresh subscription data from Stripe
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const subscription = await stripe.subscriptions.retrieve(
      client.stripeSubscriptionId
    );

    if (!subscription) {
      throw new Error("Subscription not found in Stripe");
    }

    // Update last check timestamp
    await ClientModel.findByIdAndUpdate(client._id, {
      lastRenewalCheck: now,
    });

    // Check if subscription is cancelled
    if (
      subscription.cancel_at_period_end ||
      subscription.status === "canceled"
    ) {
      await ClientModel.findByIdAndUpdate(client._id, {
        subscriptionStatus: "cancelled",
        cancelledAt: new Date(),
      });
      console.log(`🚫 Subscription cancelled for ${client.email}`);
      return { renewed: false, reason: "Subscription cancelled" };
    }

    // Check if subscription is active
    if (subscription.status !== "active") {
      console.log(
        `⏸️ Subscription not active for ${client.email} (status: ${subscription.status})`
      );
      return {
        renewed: false,
        reason: `Subscription status: ${subscription.status}`,
      };
    }

    // Get current period end from Stripe (this is the auto-renewal date)
    const stripeEndDate = new Date(subscription.current_period_end * 1000);
    const currentEndDate = client.endDate
      ? new Date(client.endDate)
      : new Date(0);

    // Check if Stripe end date is different from our local end date
    const dateDifference =
      Math.abs(stripeEndDate - currentEndDate) / (1000 * 60 * 60 * 24); // days

    if (dateDifference > 1) {
      // More than 1 day difference
      console.log(
        `🔄 Syncing end date for ${
          client.email
        }: ${currentEndDate.toISOString()} → ${stripeEndDate.toISOString()}`
      );

      await ClientModel.findByIdAndUpdate(client._id, {
        endDate: stripeEndDate,
        subscriptionStatus: "active",
      });

      // Send renewal notification email
      try {
        await sendEmail(
          client.email,
          "Uw Abonnement is Vernieuwd",
          emailTemplates.subscriptionRenewed(client.firstName, stripeEndDate)
        );
      } catch (emailError) {
        console.warn(
          `⚠️ Failed to send renewal email to ${client.email}:`,
          emailError.message
        );
        // Don't fail the renewal because of email issues
      }

      return { renewed: true, newEndDate: stripeEndDate };
    }

    console.log(`✅ Subscription up to date for ${client.email}`);
    return { renewed: false, reason: "Already up to date" };
  } catch (error) {
    console.error(
      `💥 Error checking subscription for ${client.email}:`,
      error.message
    );

    // Don't update the database on errors - let it retry later
    throw error;
  }
};

const clientLogin = async (req, res) => {
  const { email, password } = req.body;
  // Get IP address (supports proxies)
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.connection?.socket?.remoteAddress;

  try {
    const client = await ClientModel.findOne({ email }).select("+password");
    if (!client)
      return res.status(400).json({ message: "Invalid credentials email" });

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials password" });

    // CHECK AND EXTEND SUBSCRIPTION IF ACTIVE (before expiration check)
    const now = new Date();
    if (client.endDate && client.subscriptionStatus === "active") {
      await checkAndExtendSubscription(client);
      // Refresh client data after potential update
      await client.reload();
    }

    // CHECK IF SUBSCRIPTION HAS COMPLETELY EXPIRED FIRST (before any updates)
    if (client.endDate) {
      const subEnd = new Date(client.endDate);
      console.log(`Checking expiration for ${email}:`, {
        now: now.toISOString(),
        endDate: subEnd.toISOString(),
        isExpired: now > subEnd,
        subscriptionStatus: client.subscriptionStatus,
      });

      if (now > subEnd) {
        // Subscription has expired - DELETE THE ACCOUNT
        console.log(`🗑️ Attempting to delete account for ${email}...`);
        const deletedClient = await ClientModel.findByIdAndDelete(client._id);
        console.log(
          `🗑️ Account deleted:`,
          deletedClient ? "Success" : "Failed"
        );
        return res.status(403).json({
          message:
            "Your subscription has expired. Your account has been deleted. Please sign up again to continue.",
          expired: true,
        });
      }
    }

    // CHECK AND UPDATE TRIAL STATUS IF EXPIRED
    if (client.trialEndDate && client.subscriptionStatus === "trial") {
      const trialEnd = new Date(client.trialEndDate);
      if (now > trialEnd) {
        // Trial has expired, update to active subscription
        client.subscriptionStatus = "active";
        await client.save();
        console.log(
          `✅ Trial expired for ${email}. Status updated to 'active'.`
        );
      }
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const store = new smsStoreModel({
      email,
      otp,
      who: client._id, // Added: Store the client ID for OTP verification
    });

    await store.save();

    try {
      await sendEmail(
        email,
        "Uw eenmalig wachtwoord voor Virtueel Wandelen",
        emailTemplates.otpEmail(otp)
      );
      console.log(`OTP sent to ${email}: ${otp}`);
    } catch (emailError) {
      console.error("Error sending OTP email:", emailError);
    }

    res.json({ message: "OTP sent to your email", ip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const clientSignUp = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    companyName,
    func,
    telephone,
    country,
    address,
    city,
    postalCode,
    plan,
    endDate,
    trialEndDate,
    subscriptionDays,
    stripeCustomerId,
    stripeSubscriptionId,
    stripeSessionId,
    paymentStatus,
    paymentVerified,
    subscriptionStatus,
  } = req.body;
  try {
    const existingClient = await ClientModel.findOne({ email });
    if (existingClient) {
      console.log(`Duplicate signup attempt for email: ${email}`);
      return res.status(409).json({
        message:
          "An account with this email already exists. Please login instead.",
        error: "DUPLICATE_EMAIL",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newClient = new ClientModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      company: companyName,
      function: func,
      phoneNo: telephone,
      country,
      address,
      city,
      postal: postalCode,
      plan,
      subscriptionType: "self",
      startDate: new Date(),
      endDate: new Date(endDate),
      trialEndDate: trialEndDate ? new Date(trialEndDate) : null,
      subscriptionDays: subscriptionDays || 0,
      stripeCustomerId: stripeCustomerId || null,
      stripeSubscriptionId: stripeSubscriptionId || null,
      stripeSessionId: stripeSessionId || null,
      paymentStatus: paymentStatus || "pending",
      paymentVerified: paymentVerified || false,
      subscriptionStatus: subscriptionStatus || "trial",
    });

    await newClient.save();

    // Send to Laposta for newsletter/campaign
    try {
      const lapostaResponse = await axios.post(
        "https://api.laposta.nl/v2/member",
        {
          list_id: process.env.LAPOSTA_LIST_ID || "1wxtckhyt7",
          email: email,
          ip: "1.1.1.1",
          custom_fields: {
            voornaam: firstName,
            achternaam: lastName || "",
          },
          tags: ["paid_subscriber"],
          options: {
            ignore_double_optin: true,
          },
        },
        {
          auth: {
            username: process.env.LAPOSTA_API_KEY,
            password: "",
          },
        }
      );
      console.log(
        "Laposta response for paid subscriber:",
        lapostaResponse.data
      );
    } catch (lapostaError) {
      console.error(
        "Laposta error for paid subscriber:",
        lapostaError.response?.data || lapostaError.message
      );
    }

    sendSignupEmails(newClient).catch((emailError) => {
      console.error("Error sending client signup emails:", emailError);
    });

    res.status(201).json({
      message: "Client registered successfully",
      clientId: newClient._id,
    });
  } catch (error) {
    console.error("Error in clientSignUp:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message:
          "An account with this email already exists. Please login instead.",
        error: "DUPLICATE_EMAIL",
        code: 11000,
      });
    }

    res.status(500).json({
      message: "Server error during signup",
      error: error.message,
    });
  }
};

// Separate function for sending signup emails (non-blocking)
async function sendSignupEmails(client) {
  try {
    const adminEmail = "info@virtueelwandelen.nl";

    // Send email to user
    await sendEmail(
      client.email,
      "Abonnement ontvangen - Virtueel Wandelen",
      emailTemplates.individualSubscriptionUser(client)
    );

    // Send email to admin
    if (adminEmail) {
      await sendEmail(
        adminEmail,
        "Nieuw Individueel Abonnement - Virtueel Wandelen",
        emailTemplates.individualSubscriptionAdmin(client)
      );
    }

    console.log("Client signup emails sent successfully");
  } catch (emailError) {
    console.error("Error sending client signup emails:", emailError);
    throw emailError;
  }
}

const getAllvideos = async (req, res) => {
  const {
    page = 1,
    limit = 9,
    search = "",
    duration,
    location,
    province,
    municipality,
    season,
    nature,
    animals,
    sound,
  } = req.query;
  try {
    // Build filter query object
    const query = {
      isApproved: true, // Only show approved videos to clients
    };
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (duration) {
      const durationFilters = Array.isArray(duration) ? duration : [duration];
      const durationConditions = [];
      durationFilters.forEach((d) => {
        // Gemiddeld: 5-25 minutes, Lang: 25+ minutes
        if (d.includes("Gemiddeld") || d.includes("Medium")) {
          durationConditions.push({
            $expr: {
              $and: [
                { $gte: [{ $toInt: "$duration" }, 5] },
                { $lt: [{ $toInt: "$duration" }, 25] },
              ],
            },
          });
        } else if (d.includes("Lang") || d.includes("Long")) {
          durationConditions.push({
            $expr: { $gte: [{ $toInt: "$duration" }, 25] },
          });
        }
      });
      if (durationConditions.length > 0) {
        query.$or = durationConditions; // Use $or for multiple duration ranges
      }
    }
    if (location) {
      const locations = Array.isArray(location) ? location : [location];
      // Search in location, province, and municipality fields
      query.$or = query.$or || [];
      locations.forEach((loc) => {
        const searchPattern = { $regex: loc, $options: "i" };
        query.$or.push(
          { location: searchPattern },
          { province: searchPattern },
          { municipality: searchPattern },
          { tags: { $in: [loc] } }
        );
      });
    }
    if (province) {
      const provinces = Array.isArray(province) ? province : [province];
      query.$or = query.$or || [];
      provinces.forEach((p) => {
        query.$or.push({ province: p }, { tags: { $in: [p] } });
      });
    }
    if (municipality) {
      const municipalities = Array.isArray(municipality)
        ? municipality
        : [municipality];
      query.$or = query.$or || [];
      municipalities.forEach((m) => {
        query.$or.push({ municipality: m }, { tags: { $in: [m] } });
      });
    }
    if (season) {
      const seasons = Array.isArray(season) ? season : [season];
      query.$or = query.$or || [];
      seasons.forEach((s) => {
        query.$or.push({ season: s }, { tags: { $in: [s] } });
      });
    }
    if (nature) {
      const natures = Array.isArray(nature) ? nature : [nature];
      query.$or = query.$or || [];
      natures.forEach((n) => {
        query.$or.push({ nature: n }, { tags: { $in: [n] } });
      });
    }
    if (animals) {
      const animalList = Array.isArray(animals) ? animals : [animals];
      query.$or = query.$or || [];
      animalList.forEach((animal) => {
        query.$or.push(
          { animals: { $regex: animal, $options: "i" } },
          { tags: { $in: [animal] } }
        );
      });
    }
    if (sound) {
      const sounds = Array.isArray(sound) ? sound : [sound];
      query.$or = query.$or || [];
      sounds.forEach((s) => {
        query.$or.push({ sound: s }, { tags: { $in: [s] } });
      });
    }

    // Fetch videos with filters and pagination
    const videos = await VideoModel.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 }); // Sort by newest first

    // Count total with filters
    const total = await VideoModel.countDocuments(query);

    res.json({
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      videos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const requestVideo = async (req, res) => {
  const { email, location, link } = req.body;
  try {
    const newRequest = new VideoRequestModel({
      email,
      location,
      link,
    });
    await newRequest.save();
    res.status(201).json({ message: "Video request submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAccountInfo = async (req, res) => {
  const clientId = req.params.clientId;
  try {
    const client = await ClientModel.findById(clientId).populate("orgId");
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json({ client });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteAccount = async (req, res) => {
  const clientId = req.body.clientId;
  try {
    const client = await ClientModel.findByIdAndDelete(clientId);
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json({ message: "Client account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addReview = async (req, res) => {
  const { clientId, review, rating, vidoId } = req.body;
  try {
    const client = await ClientModel.findById(clientId);
    const video = await VideoModel.findById(vidoId);

    if (!client) return res.status(404).json({ message: "Client not found" });
    if (!video) return res.status(404).json({ message: "Video not found" });

    const existingReview = await ReviewModel.findOne({
      video: vidoId,
      clientId: clientId,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this video",
      });
    }

    const newReview = new ReviewModel({
      username: client.firstName,
      rating,
      review,
      video: vidoId,
      clientId: clientId,
    });

    await newReview.save();
    video.reviews.push(newReview._id);

    await video.save();
    res.json({ message: "Review added successfully", newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllReviews = async (req, res) => {
  const { videoId } = req.params;
  const { userId } = req.query;

  try {
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "Invalid video ID format" });
    }

    const video = await VideoModel.findById(videoId).populate("reviews");

    if (!video) return res.status(404).json({ message: "Video not found" });

    let hasReviewed = false;

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      const userReview = await ReviewModel.findOne({
        video: videoId,
        clientId: userId,
      });

      hasReviewed = !!userReview;
    }

    res.json({
      reviews: video.reviews || [],
      hasReviewed: hasReviewed,
    });
  } catch (error) {
    console.error("Error in getAllReviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getVideo = async (req, res) => {
  const { videoId } = req.params;
  try {
    const video = await VideoModel.findOne({
      _id: videoId,
      isApproved: true,
    }).populate("reviews");

    if (!video)
      return res
        .status(404)
        .json({ message: "Video not found or not approved" });
    res.json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addView = async (req, res) => {
  const { videoId } = req.params;
  try {
    const video = await VideoModel.findById(videoId);
    if (!video.views) {
      video.views = 0;
    }
    video.views += 1;
    await video.save();
    res.json({ message: "View added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addLike = async (req, res) => {
  const { videoId } = req.params;
  const userId = req.query.userId;

  try {
    // Convert to ObjectId
    const userObjectId = mongoose.Types.ObjectId.isValid(userId)
      ? new mongoose.Types.ObjectId(userId)
      : userId;

    // Check if like already exists
    const likeExists = await LikeModel.findOne({
      videoId,
      userId: userObjectId,
    });

    if (likeExists) {
      // Unlike - remove the like
      await LikeModel.deleteOne({ _id: likeExists._id });

      // Decrement video like count
      await VideoModel.findByIdAndUpdate(videoId, {
        $inc: { likes: -1 },
      });

      return res.json({
        message: "Like removed successfully",
        liked: false,
      });
    } else {
      // Like - add new like
      const newLike = new LikeModel({
        videoId,
        userId: userObjectId,
      });
      await newLike.save();

      // Increment video like count
      await VideoModel.findByIdAndUpdate(videoId, {
        $inc: { likes: 1 },
      });

      return res.json({
        message: "Like added successfully",
        liked: true,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const checkLikeStatus = async (req, res) => {
  const { videoId } = req.params;
  const userId = req.query.userId;

  try {
    // Convert to ObjectId
    const userObjectId = mongoose.Types.ObjectId.isValid(userId)
      ? new mongoose.Types.ObjectId(userId)
      : userId;

    const likeExists = await LikeModel.exists({
      videoId,
      userId: userObjectId,
    });
    res.json({ isLiked: !!likeExists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateAccountInfo = async (req, res) => {
  const clientId = req.params.clientId;
  const {
    firstName,
    lastName,
    phoneNo,
    address,
    postal,
    country,
    company,
    profilePic,
  } = req.body; // Only allow safe fields to update

  try {
    const client = await ClientModel.findById(clientId);
    if (!client) return res.status(404).json({ message: "Client not found" });

    // Update only provided fields
    if (firstName !== undefined) client.firstName = firstName;
    if (lastName !== undefined) client.lastName = lastName;
    if (phoneNo !== undefined) client.phoneNo = phoneNo;
    if (address !== undefined) client.address = address;
    if (postal !== undefined) client.postal = postal;
    if (country !== undefined) client.country = country;
    if (company !== undefined) client.company = company;
    if (profilePic !== undefined) client.profilePic = profilePic;

    await client.save();
    res.json({ message: "Profile updated successfully", client });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const uploadProfilePicture = async (req, res) => {
  const clientId = req.params.clientId;
  const { profilePicUrl } = req.body;

  try {
    const client = await ClientModel.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    client.profilePic = profilePicUrl;
    await client.save();

    res.json({
      message: "Profile picture updated successfully",
      profilePic: client.profilePic,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updatePassword = async (req, res) => {
  const clientId = req.params.clientId;
  const { newPassword } = req.body;

  try {
    const client = await ClientModel.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    client.password = hashedPassword;
    await client.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const cancelSubscription = async (req, res) => {
  try {
    const clientId = req.body.clientId || req.params.clientId;

    if (!clientId) {
      return res.status(400).json({
        success: false,
        message: "Client ID is required",
      });
    }

    const client = await ClientModel.findById(clientId);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    const now = new Date();
    const trialEndDate = client.trialEndDate;
    const startDate = client.startDate || client.createdAt;

    // Calculate if in trial period
    // Option 1: If trialEndDate exists, use it
    // Option 2: If no trialEndDate but has startDate, check if within 7 days
    // Option 3: Check subscription status
    let isInTrialPeriod = false;

    if (trialEndDate) {
      isInTrialPeriod = now < new Date(trialEndDate);
    } else if (startDate) {
      // Calculate 7 days from start
      const sevenDaysFromStart = new Date(startDate);
      sevenDaysFromStart.setDate(sevenDaysFromStart.getDate() + 7);
      isInTrialPeriod = now < sevenDaysFromStart;
    }

    // Also consider subscription status
    if (client.subscriptionStatus === "trial") {
      isInTrialPeriod = true;
    }

    console.log("Cancel Subscription Debug:", {
      clientId,
      now: now.toISOString(),
      trialEndDate: trialEndDate?.toISOString(),
      startDate: startDate?.toISOString(),
      subscriptionStatus: client.subscriptionStatus,
      isInTrialPeriod,
      hasStripeSubId: !!client.stripeSubscriptionId,
    });

    // Cancel subscription in Stripe if exists
    if (client.stripeSubscriptionId) {
      const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

      try {
        await stripe.subscriptions.cancel(client.stripeSubscriptionId);
        console.log(
          "Stripe subscription cancelled:",
          client.stripeSubscriptionId
        );
      } catch (stripeError) {
        console.error("Error cancelling Stripe subscription:", stripeError);
        // Continue even if Stripe cancellation fails
      }
    } else {
      console.log(
        "No Stripe subscription ID found, skipping Stripe cancellation"
      );
    }

    if (isInTrialPeriod) {
      // During trial period: Delete the account completely
      await ClientModel.findByIdAndDelete(clientId);

      console.log("Account deleted during trial period:", clientId);

      return res.json({
        success: true,
        message: "Account deleted successfully during trial period",
        action: "deleted",
      });
    } else {
      // After trial period: Mark as cancelled but keep account active until expiry
      client.subscriptionStatus = "cancelled";
      client.cancelledAt = now;
      await client.save();

      return res.json({
        success: true,
        message:
          "Subscription cancelled. Your account will remain active until the end of your billing period.",
        action: "cancelled",
        activeUntil: client.endDate,
      });
    }
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to cancel subscription",
      error: error.message,
    });
  }
};

// Scheduled function to check and renew all subscriptions
// This should be called by a cron job (e.g., daily)
const checkAllSubscriptionsForRenewal = async () => {
  try {
    console.log("🔄 Starting scheduled subscription renewal check...");

    const now = new Date();
    const sevenDaysFromNow = new Date(now);
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    // Find all active subscriptions that are approaching expiry or recently expired
    const clientsToCheck = await ClientModel.find({
      subscriptionStatus: "active",
      endDate: {
        $lte: sevenDaysFromNow, // End date is within next 7 days
        $gte: new Date(now.getTime() - 24 * 60 * 60 * 1000), // Not expired more than 1 day ago
      },
    });

    console.log(
      `Found ${clientsToCheck.length} subscriptions to check for renewal`
    );

    let renewed = 0;
    let failed = 0;

    for (const client of clientsToCheck) {
      try {
        const wasRenewed = await checkAndExtendSubscription(client);
        if (wasRenewed) {
          renewed++;
        }
      } catch (error) {
        console.error(
          `Failed to renew subscription for ${client.email}:`,
          error
        );
        failed++;
      }
    }

    console.log(`✅ Subscription renewal check completed:`, {
      checked: clientsToCheck.length,
      renewed,
      failed,
    });

    return { checked: clientsToCheck.length, renewed, failed };
  } catch (error) {
    console.error("Error in checkAllSubscriptionsForRenewal:", error);
    throw error;
  }
};

// Function to sync a specific client's subscription with Stripe
const syncSubscriptionWithStripe = async (req, res) => {
  try {
    const { clientId } = req.params;
    const client = await ClientModel.findById(clientId);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    if (!client.stripeSubscriptionId) {
      return res.status(400).json({
        message: "No Stripe subscription found for this client",
      });
    }

    const wasUpdated = await checkAndExtendSubscription(client);

    // Reload client to get updated data
    const updatedClient = await ClientModel.findById(clientId);

    return res.json({
      success: true,
      message: wasUpdated
        ? "Subscription synced and updated with Stripe"
        : "Subscription already in sync with Stripe",
      subscription: {
        status: updatedClient.subscriptionStatus,
        endDate: updatedClient.endDate,
      },
    });
  } catch (error) {
    console.error("Error syncing subscription with Stripe:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to sync subscription",
      error: error.message,
    });
  }
};

// Create pending signup and Stripe checkout session
const createPendingSignup = async (req, res) => {
  const PendingSignupModel = require("../models/pendingSignupModel");
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phoneNo,
      country,
      address,
      city,
      postalCode,
      plan,
    } = req.body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !plan) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Check if email already exists in ClientModel
    const existingClient = await ClientModel.findOne({ email });
    if (existingClient) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Delete any existing pending signup with this email
    await PendingSignupModel.deleteMany({ email });

    // Create pending signup
    const pendingSignup = await PendingSignupModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNo,
      country,
      address,
      city,
      postalCode,
      plan,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      status: "pending",
    });

    // Determine price ID based on plan period
    let priceId;
    if (plan.period === "month") {
      //priceId = "price_1RJJaTBZBQKzDdfqpAwrEr5t"; // Monthly production price
      priceId = "price_1RH90IBDkkC6KY4EQZJmFplW"; // Monthly test price
    } else if (plan.period === "year") {
      priceId = "price_1SFY5KBZBQKzDdfq7tPywkXO"; // Yearly production price
      return res.status(400).json({
        success: false,
        message: "Invalid plan period",
      });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "ideal"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancelled`,
      customer_email: email,
      metadata: {
        pendingSignupId: pendingSignup._id.toString(),
        email: email,
        firstName: firstName,
        lastName: lastName,
      },
      subscription_data: {
        trial_period_days: 7, // 7-day trial
        metadata: {
          pendingSignupId: pendingSignup._id.toString(),
        },
      },
    });

    // Update pending signup with Stripe session ID
    pendingSignup.stripeCheckoutSessionId = session.id;
    await pendingSignup.save();

    return res.status(200).json({
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id,
      pendingSignupId: pendingSignup._id,
    });
  } catch (error) {
    console.error("Error creating pending signup:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create pending signup",
      error: error.message,
    });
  }
};

// Complete signup after successful Stripe payment (called by webhook)
const completeSignupAfterPayment = async (stripeSessionId) => {
  const PendingSignupModel = require("../models/pendingSignupModel");
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  try {
    console.log(
      `🔄 Starting signup completion for session: ${stripeSessionId}`
    );

    // Find pending signup by Stripe session ID
    const pendingSignup = await PendingSignupModel.findOne({
      stripeCheckoutSessionId: stripeSessionId,
      status: "pending",
    });

    if (!pendingSignup) {
      console.error(
        `❌ Pending signup not found for session: ${stripeSessionId}`
      );
      throw new Error("Pending signup not found or already completed");
    }

    console.log(`✓ Found pending signup for: ${pendingSignup.email}`);

    // Retrieve Stripe session to get subscription details
    const session = await stripe.checkout.sessions.retrieve(stripeSessionId, {
      expand: ["subscription", "customer"],
    });

    if (!session.subscription) {
      console.error("❌ No subscription found in Stripe session");
      throw new Error("No subscription found in Stripe session");
    }

    console.log(`✓ Retrieved Stripe session and subscription`);

    const subscription =
      typeof session.subscription === "string"
        ? await stripe.subscriptions.retrieve(session.subscription)
        : session.subscription;

    const customer =
      typeof session.customer === "string"
        ? await stripe.customers.retrieve(session.customer)
        : session.customer;

    // Calculate dates with fallback logic
    const now = new Date();

    // Trial end date
    let trialEnd;
    if (subscription.trial_end && !isNaN(subscription.trial_end)) {
      trialEnd = new Date(subscription.trial_end * 1000);
    } else {
      // Default to 7 days from now if trial_end is missing
      trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    }

    // Period end date
    let periodEnd;
    if (
      subscription.current_period_end &&
      !isNaN(subscription.current_period_end)
    ) {
      periodEnd = new Date(subscription.current_period_end * 1000);
    } else {
      // Calculate based on plan period if current_period_end is missing
      const daysToAdd = pendingSignup.plan.period === "year" ? 365 : 30;
      periodEnd = new Date(
        trialEnd.getTime() + daysToAdd * 24 * 60 * 60 * 1000
      );
    }

    console.log(
      `✓ Dates calculated - Trial ends: ${trialEnd.toISOString()}, Period ends: ${periodEnd.toISOString()}`
    );

    // Validate dates before creating client
    if (isNaN(trialEnd.getTime())) {
      throw new Error("Invalid trial end date");
    }
    if (isNaN(periodEnd.getTime())) {
      throw new Error("Invalid period end date");
    }

    const subscriptionDays = Math.ceil(
      (periodEnd - now) / (1000 * 60 * 60 * 24)
    );

    console.log(`✓ Subscription days: ${subscriptionDays}`);

    // Create the actual client account
    const newClient = await ClientModel.create({
      email: pendingSignup.email,
      password: pendingSignup.password,
      firstName: pendingSignup.firstName,
      lastName: pendingSignup.lastName,
      phoneNo: pendingSignup.phoneNo,
      country: pendingSignup.country,
      address: pendingSignup.address,
      city: pendingSignup.city,
      postal: pendingSignup.postalCode,
      company: "",
      plan: pendingSignup.plan,
      subscriptionType: "individual",
      paymentMethod: "stripe",
      stripeCustomerId: customer.id,
      stripeSubscriptionId: subscription.id,
      stripeSessionId: stripeSessionId,
      subscriptionStatus:
        subscription.status === "trialing" ? "trial" : "active",
      paymentStatus: "completed",
      startDate: now,
      trialEndDate: trialEnd,
      endDate: periodEnd,
      subscriptionDays: subscriptionDays,
    });

    console.log(`✅ Client account created: ${newClient.email}`);

    // Mark pending signup as completed
    pendingSignup.status = "completed";
    await pendingSignup.save();

    console.log(`✓ Pending signup marked as completed`);

    // Send welcome email
    try {
      await sendEmail(
        newClient.email,
        "Welkom bij Virtueel Wandelen!",
        emailTemplates.welcome(newClient.firstName, trialEnd)
      );
      console.log(`✓ Welcome email sent to ${newClient.email}`);
    } catch (emailError) {
      console.warn("⚠️ Failed to send welcome email:", emailError.message);
    }

    console.log(`✅ Signup completed successfully for ${newClient.email}`);
    return { success: true, client: newClient };
  } catch (error) {
    console.error("💥 Error completing signup after payment:", error);
    throw error;
  }
};

// Stripe webhook handler
const handleStripeWebhook = async (req, res) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        console.log("Checkout session completed:", session.id);

        // Complete the signup
        await completeSignupAfterPayment(session.id);
        break;

      case "customer.subscription.updated":
        const updatedSubscription = event.data.object;
        console.log("Subscription updated:", updatedSubscription.id);

        // Update client subscription status
        const client = await ClientModel.findOne({
          stripeSubscriptionId: updatedSubscription.id,
        });

        if (client) {
          const newEndDate = new Date(
            updatedSubscription.current_period_end * 1000
          );
          client.endDate = newEndDate;
          client.subscriptionStatus = updatedSubscription.status;

          // Check if trial ended
          if (
            updatedSubscription.status === "active" &&
            client.subscriptionStatus === "trial"
          ) {
            client.subscriptionStatus = "active";
          }

          await client.save();
          console.log(`✅ Updated subscription for ${client.email}`);
        }
        break;

      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object;
        console.log("Subscription deleted:", deletedSubscription.id);

        const deletedClient = await ClientModel.findOne({
          stripeSubscriptionId: deletedSubscription.id,
        });

        if (deletedClient) {
          deletedClient.subscriptionStatus = "cancelled";
          deletedClient.cancelledAt = new Date();
          await deletedClient.save();
          console.log(`🚫 Subscription cancelled for ${deletedClient.email}`);
        }
        break;

      case "invoice.payment_failed":
        const invoice = event.data.object;
        console.log("Payment failed for invoice:", invoice.id);

        const failedClient = await ClientModel.findOne({
          stripeCustomerId: invoice.customer,
        });

        if (failedClient) {
          // Send payment failed notification
          try {
            await sendEmail(
              failedClient.email,
              "Betalingsprobleem met uw abonnement",
              emailTemplates.paymentFailed(failedClient.firstName)
            );
          } catch (emailError) {
            console.warn(
              "Failed to send payment failed email:",
              emailError.message
            );
          }
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Error handling webhook:", error);
    res.status(500).json({ error: "Webhook handler failed" });
  }
};

// Manual completion endpoint for testing/fallback
const manualCompleteSignup = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "Session ID is required",
      });
    }

    console.log(`🔧 Manual completion requested for session: ${sessionId}`);

    const result = await completeSignupAfterPayment(sessionId);

    return res.status(200).json({
      success: true,
      message: "Signup completed successfully",
      client: {
        email: result.client.email,
        firstName: result.client.firstName,
        lastName: result.client.lastName,
      },
    });
  } catch (error) {
    console.error("Error in manual completion:", error);

    // Check if it's a duplicate key error (account already exists)
    if (error.code === 11000 || error.message.includes("duplicate")) {
      return res.status(200).json({
        success: true,
        message: "Account already exists",
        alreadyExists: true,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to complete signup",
    });
  }
};

module.exports = {
  clientLogin,
  clientSignUp,
  getAllvideos,
  requestVideo,
  getAccountInfo,
  deleteAccount,
  addReview,
  getAllReviews,
  getAccountInfo,
  getVideo,
  addView,
  addLike,
  updateAccountInfo,
  checkLikeStatus,
  uploadProfilePicture,
  updatePassword,
  cancelSubscription,
  checkAllSubscriptionsForRenewal,
  syncSubscriptionWithStripe,
  checkAndExtendSubscription,
  createPendingSignup,
  completeSignupAfterPayment,
  handleStripeWebhook,
  manualCompleteSignup,
};
