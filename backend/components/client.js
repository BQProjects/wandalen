const ClientModel = require("../models/clientModel");
const crypto = require("crypto");
const smsStoreModel = require("../models/smsStoreModel");
const ReviewModel = require("../models/reviewModel");
const VideoModel = require("../models/videoModel");
const VideoRequestModel = require("../models/videoRequestModel");
const bcrypt = require("bcrypt");
const LikeModel = require("../models/likeModel");
const mongoose = require("mongoose");
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
          "Subscription Renewed",
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
        "Your OTP for Virtual Wandlen",
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
    const adminEmail = "tina@10natuurlijk.nl";

    // Send email to user
    await sendEmail(
      client.email,
      "Subscription Received - Virtual Wandlen",
      emailTemplates.individualSubscriptionUser(client)
    );

    // Send email to admin
    if (adminEmail) {
      await sendEmail(
        adminEmail,
        "New Individual Subscription - Virtual Wandlen",
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
          { municipality: searchPattern }
        );
      });
    }
    if (province) {
      const provinces = Array.isArray(province) ? province : [province];
      query.province = { $in: provinces };
    }
    if (municipality) {
      const municipalities = Array.isArray(municipality)
        ? municipality
        : [municipality];
      query.municipality = { $in: municipalities };
    }
    if (season) {
      const seasons = Array.isArray(season) ? season : [season];
      query.season = { $in: seasons };
    }
    if (nature) {
      const natures = Array.isArray(nature) ? nature : [nature];
      query.nature = { $in: natures };
    }
    if (animals) {
      const animalList = Array.isArray(animals) ? animals : [animals];
      query.animals = { $in: animalList };
    }
    if (sound) {
      const sounds = Array.isArray(sound) ? sound : [sound];
      query.sound = { $in: sounds };
    }

    // Fetch videos with filters and pagination
    const videos = await VideoModel.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

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
};
