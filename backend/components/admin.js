const AdminModel = require("../models/adminModel");
const OrgModel = require("../models/orgModel");
const bcrypt = require("bcrypt");
const ClientModel = require("../models/clientModel");
const VolunteerModel = require("../models/volunteerModel");
const VideoModel = require("../models/videoModel");
const videoRequestModel = require("../models/videoRequestModel");
const BlogModel = require("../models/blogModel");
const TrainingModel = require("../models/trainingModel");
const { sendEmail, emailTemplates } = require("../services/emailService");
const vimeoService = require("../services/vimeoService");

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await AdminModel.findOne({ email }).select("+password");
    if (!admin) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }
    res.status(200).json({
      message: "Admin login successful",
      email: admin.email,
      id: admin._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllOrgData = async (req, res) => {
  try {
    const orgs = await OrgModel.find().select("-password").populate("clients");
    res.status(200).json(orgs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllClientData = async (req, res) => {
  try {
    const clients = await ClientModel.find();
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllOrgRequest = async (req, res) => {
  try {
    const requests = await OrgModel.find({})
      .populate("clients")
      .select("-password");
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllVolunteerData = async (req, res) => {
  try {
    const volunteers = await VolunteerModel.find().select("-password");
    return res.status(200).json(volunteers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getVolunteerInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const volunteer = await VolunteerModel.findById(id).select("-password");

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.status(200).json(volunteer);
  } catch (error) {
    console.error("Error fetching volunteer details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getallVideoRequest = async (req, res) => {
  try {
    const requests = await videoRequestModel
      .find()
      .populate("completedBy", "firstName lastName email")
      .populate("createdBy", "firstName lastName email")
      .sort({ createdAt: -1 });
    return res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deteleteVideoRequest = async (req, res) => {
  const { id } = req.params;
  try {
    await videoRequestModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Video request deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

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
    const query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (duration) {
      const durationFilters = Array.isArray(duration) ? duration : [duration];
      const durationConditions = [];
      durationFilters.forEach((d) => {
        // Gemiddeld: 5-25 minutes, Lang: 25+ minutes
        if (d === "medium" || d.includes("Medium") || d.includes("Gemiddeld")) {
          durationConditions.push({
            $expr: {
              $and: [
                { $gte: [{ $toInt: "$duration" }, 5] },
                { $lt: [{ $toInt: "$duration" }, 25] },
              ],
            },
          });
        } else if (d === "long" || d.includes("Long") || d.includes("Lang")) {
          durationConditions.push({
            $expr: { $gte: [{ $toInt: "$duration" }, 25] },
          });
        }
      });
      if (durationConditions.length > 0) {
        query.$or = durationConditions;
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
      .populate("uploadedBy", "firstName lastName email") // Populate volunteer info
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

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, content, imgUrl, author, date } = req.body;
    const newBlog = new BlogModel({ title, content, imgUrl, author, date });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, imgUrl, author, date } = req.body;
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      { title, content, imgUrl, author, date },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await BlogModel.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getTrainings = async (req, res) => {
  try {
    const trainings = await TrainingModel.find();
    res.status(200).json(trainings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createTraining = async (req, res) => {
  try {
    const { title, date, location, timing, description, createdBy } = req.body;
    const newTraining = new TrainingModel({
      title,
      date,
      location,
      timing,
      description,
      createdBy,
    });
    await newTraining.save();
    res.status(201).json(newTraining);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTraining = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, location, timing, description, createdBy } = req.body;
    const updatedTraining = await TrainingModel.findByIdAndUpdate(
      id,
      { title, date, location, timing, description, createdBy },
      { new: true }
    );
    if (!updatedTraining) {
      return res.status(404).json({ message: "Training not found" });
    }
    res.status(200).json(updatedTraining);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTraining = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTraining = await TrainingModel.findByIdAndDelete(id);
    if (!deletedTraining) {
      return res.status(404).json({ message: "Training not found" });
    }
    res.status(200).json({ message: "Training deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteVolunteer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVolunteer = await VolunteerModel.findByIdAndDelete(id);
    if (!deletedVolunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    res.status(200).json({ message: "Volunteer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteOrg = async (req, res) => {
  try {
    const { orgId } = req.params;
    const deletedOrg = await OrgModel.findByIdAndDelete(orgId);
    if (!deletedOrg) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.status(200).json({ message: "Organization deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const client = await ClientModel.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Check if client has an active Stripe subscription
    if (client.stripeSubscriptionId) {
      const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
      try {
        const subscription = await stripe.subscriptions.retrieve(
          client.stripeSubscriptionId
        );

        // Check if subscription is cancelled
        if (
          subscription.status !== "canceled" &&
          !subscription.cancel_at_period_end
        ) {
          return res.status(400).json({
            message:
              "Cannot delete client with active subscription. Please cancel the subscription in Stripe first.",
          });
        }
      } catch (stripeError) {
        console.error("Error checking Stripe subscription:", stripeError);
        // If we can't check Stripe, allow deletion to avoid blocking
        console.warn("Proceeding with deletion due to Stripe API error");
      }
    }

    // Delete the client
    await ClientModel.findByIdAndDelete(clientId);
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const approveOrg = async (req, res) => {
  try {
    const { orgId } = req.params;
    const updates = req.body;

    // Set status to approved
    updates.requestStates = "approved";

    if (updates.planValidFrom) {
      updates.planValidFrom = new Date(updates.planValidFrom);
    }
    if (updates.planValidTo) {
      updates.planValidTo = new Date(updates.planValidTo);
    }

    const updatedOrg = await OrgModel.findByIdAndUpdate(orgId, updates, {
      new: true,
    }).select("-password");

    if (!updatedOrg) {
      return res.status(404).json({ message: "Organization not found" });
    }

    // If plan dates were set, update all clients' dates to match
    if (updates.planValidFrom || updates.planValidTo) {
      try {
        const updateFields = {};
        if (updates.planValidFrom) {
          updateFields.startDate = updates.planValidFrom;
        }
        if (updates.planValidTo) {
          updateFields.endDate = updates.planValidTo;
        }

        await ClientModel.updateMany({ orgId: orgId }, updateFields);

        console.log(
          `Updated dates for all clients of newly approved organization ${orgId}`
        );
      } catch (clientUpdateError) {
        console.error("Error updating client dates:", clientUpdateError);
      }
    }

    // Send emails after successful approval
    try {
      const adminEmail = "info@virtueelwandelen.nl";
      const customerEmail = updatedOrg.contactPerson?.email || updatedOrg.email;

      // Create password setup link
      const passwordLink = `${
        process.env.FRONTEND_URL || "https://virtueelwandelen.nl"
      }/generate-pass/${updatedOrg._id}`;

      // Send email to customer (isUpdate = false for new approvals)
      await sendEmail(
        customerEmail,
        "Welkom bij Virtueel Wandelen - Uw Organisatie Account is Goedgekeurd!",
        emailTemplates.customerApprovalUser(updatedOrg, passwordLink, false)
      );

      // Send email to admin
      if (adminEmail) {
        await sendEmail(
          adminEmail,
          "Organisatie Account Aangemaakt - Virtueel Wandelen",
          emailTemplates.customerApprovalAdmin(updatedOrg)
        );
      }

      console.log("Approval emails sent successfully");
    } catch (emailError) {
      console.error("Error sending approval emails:", emailError);
      // Don't fail the request if email sending fails
    }

    res.status(200).json(updatedOrg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateOrg = async (req, res) => {
  try {
    const { orgId } = req.params;
    const updates = req.body;

    if (updates.planValidFrom) {
      updates.planValidFrom = new Date(updates.planValidFrom);
    }
    if (updates.planValidTo) {
      updates.planValidTo = new Date(updates.planValidTo);
    }

    const updatedOrg = await OrgModel.findByIdAndUpdate(orgId, updates, {
      new: true,
    }).select("-password");

    if (!updatedOrg) {
      return res.status(404).json({ message: "Organization not found" });
    }

    // If plan dates were updated, update all clients' dates to match
    if (updates.planValidFrom || updates.planValidTo) {
      try {
        const updateFields = {};
        if (updates.planValidFrom) {
          updateFields.startDate = updates.planValidFrom;
        }
        if (updates.planValidTo) {
          updateFields.endDate = updates.planValidTo;
        }

        await ClientModel.updateMany({ orgId: orgId }, updateFields);

        console.log(`Updated dates for all clients of organization ${orgId}`);
      } catch (clientUpdateError) {
        console.error("Error updating client dates:", clientUpdateError);
        // Don't fail the request if client update fails
      }
    }
    // Send emails after successful update
    try {
      const adminEmail = "info@virtueelwandelen.nl";
      const customerEmail = updatedOrg.contactPerson?.email || updatedOrg.email;

      // For updates, we don't include password setup link in customer email
      const passwordLink = `${
        process.env.FRONTEND_URL || "https://virtueelwandelen.nl"
      }/generate-pass/${updatedOrg._id}`;

      // Send email to customer (isUpdate = true for updates, no password link)
      await sendEmail(
        customerEmail,
        "Virtual Wandlen - Your Organization Account has been Updated",
        emailTemplates.customerApprovalUser(updatedOrg, passwordLink, true)
      );

      // Send email to admin
      if (adminEmail) {
        await sendEmail(
          adminEmail,
          "Organization Account Updated - Virtual Wandlen",
          emailTemplates.customerApprovalAdmin(updatedOrg)
        );
      }

      console.log("Update emails sent successfully");
    } catch (emailError) {
      console.error("Error sending update emails:", emailError);
      // Don't fail the request if email sending fails
    }

    res.status(200).json(updatedOrg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const uploadVideo = async (req, res) => {
  const {
    title,
    url,
    location,
    description,
    season,
    nature,
    sound,
    animals,
    tags,
    imgUrl,
    duration,
  } = req.body;

  try {
    // Admin-uploaded videos are automatically approved
    const newVideo = new VideoModel({
      title,
      url,
      uploaderModel: "Admin",
      location,
      description,
      season,
      nature,
      sound,
      animals,
      tags,
      imgUrl,
      duration,
      uploadedBy: req.user?.id, // This would come from auth middleware if available
      isApproved: true, // Admin videos are automatically approved
    });

    await newVideo.save();
    res
      .status(201)
      .json({ message: "Video uploaded successfully", video: newVideo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await VideoModel.findById(videoId)
      .populate("uploadedBy", "firstName lastName email")
      .populate("reviews");

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const toggleVideoApproval = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { isApproved } = req.body;

    const updatedVideo = await VideoModel.findByIdAndUpdate(
      videoId,
      { isApproved },
      { new: true }
    ).populate("uploadedBy", "firstName lastName email");

    if (!updatedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json({
      message: `Video ${isApproved ? "approved" : "unapproved"} successfully`,
      video: updatedVideo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const uploadThumbnailToVimeo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const { videoId } = req.body;

    if (!videoId) {
      return res.status(400).json({ message: "Video ID is required" });
    }

    console.log(`Uploading thumbnail to Vimeo video ${videoId}...`);

    // Upload thumbnail to Vimeo
    const result = await vimeoService.uploadThumbnail(videoId, req.file.buffer);

    res.status(200).json({
      message: "Thumbnail uploaded successfully to Vimeo",
      thumbnailUrl: result.thumbnailUrl,
      pictureUri: result.pictureUri,
    });
  } catch (error) {
    console.error("Error uploading thumbnail to Vimeo:", error);
    res.status(500).json({
      message: "Failed to upload thumbnail to Vimeo",
      error: error.message,
    });
  }
};

/**
 * Get Vimeo upload ticket for direct client upload
 */
const getVimeoUploadTicket = async (req, res) => {
  try {
    const { title, description } = req.body;

    console.log("Getting Vimeo upload ticket for direct upload...");

    const ticket = await vimeoService.getUploadTicket({ title, description });

    res.status(200).json({
      message: "Upload ticket obtained successfully",
      ticket,
    });
  } catch (error) {
    console.error("Error getting Vimeo upload ticket:", error);
    res.status(500).json({
      message: "Failed to get Vimeo upload ticket",
      error: error.message,
    });
  }
};

/**
 * Get Vimeo video details after direct upload
 */
const getVimeoVideoDetails = async (req, res) => {
  try {
    const { videoId } = req.params;

    console.log(`Getting Vimeo video details for video ${videoId}...`);

    const videoData = await vimeoService.getVideo(videoId);

    // Construct embed URL with privacy hash and embed parameters
    const privacyHash =
      videoData.player_embed_url.split("?h=")[1]?.split("&")[0] || "";
    const embedParams = `?h=${privacyHash}&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`;
    const fullEmbedUrl = `https://player.vimeo.com/video/${videoId}${embedParams}`;

    res.status(200).json({
      message: "Video details retrieved successfully",
      embedUrl: fullEmbedUrl,
      videoData,
    });
  } catch (error) {
    console.error("Error getting Vimeo video details:", error);
    res.status(500).json({
      message: "Failed to get Vimeo video details",
      error: error.message,
    });
  }
};

const createAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin already exists
    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newAdmin = new AdminModel({
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({
      message: "Admin created successfully",
      admin: { email: newAdmin.email, id: newAdmin._id },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await AdminModel.find().select("-password");
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, email, password } = req.body;

  try {
    const admin = await AdminModel.findById(id).select("+password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Prepare updates
    const updates = {};
    if (email) {
      updates.email = email;
    }
    if (password) {
      const saltRounds = 10;
      updates.password = await bcrypt.hash(password, saltRounds);
    }

    const updatedAdmin = await AdminModel.findByIdAndUpdate(id, updates, {
      new: true,
    }).select("-password");
    res
      .status(200)
      .json({ message: "Admin updated successfully", admin: updatedAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await AdminModel.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    await AdminModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getClientPaymentDetails = async (req, res) => {
  try {
    const { clientId } = req.params;
    const client = await ClientModel.findById(clientId);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Initialize response with basic data
    const paymentDetails = {
      client: {
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        company: client.company,
      },
      subscription: {
        status: client.subscriptionStatus,
        startDate: client.startDate,
        endDate: client.endDate,
        trialEndDate: client.trialEndDate,
        planTitle: client.plan?.title,
        planPrice: client.plan?.price,
        planPeriod: client.plan?.period,
      },
      payment: {
        status: client.paymentStatus,
        verified: client.paymentVerified,
      },
      stripe: null,
    };

    // If client has Stripe information, fetch from Stripe API
    if (client.stripeCustomerId || client.stripeSubscriptionId) {
      const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

      try {
        // Fetch Stripe customer details
        if (client.stripeCustomerId) {
          const customer = await stripe.customers.retrieve(
            client.stripeCustomerId
          );
          paymentDetails.stripe = {
            customerId: customer.id,
            email: customer.email,
            name: customer.name,
          };
        }

        // Fetch Stripe subscription details
        if (client.stripeSubscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(
            client.stripeSubscriptionId
          );

          paymentDetails.stripe = {
            ...paymentDetails.stripe,
            subscriptionId: subscription.id,
            subscriptionStatus: subscription.status,
            currentPeriodStart: new Date(
              subscription.current_period_start * 1000
            ),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            canceledAt: subscription.canceled_at
              ? new Date(subscription.canceled_at * 1000)
              : null,
          };

          // Fetch payment method if available
          if (subscription.default_payment_method) {
            const paymentMethod = await stripe.paymentMethods.retrieve(
              subscription.default_payment_method
            );

            paymentDetails.stripe.paymentMethod = {
              type: paymentMethod.type,
              brand: paymentMethod.card?.brand,
              last4: paymentMethod.card?.last4,
              expMonth: paymentMethod.card?.exp_month,
              expYear: paymentMethod.card?.exp_year,
              cardholderName: paymentMethod.billing_details?.name,
            };
          }

          // Fetch latest invoice
          if (subscription.latest_invoice) {
            const invoice = await stripe.invoices.retrieve(
              subscription.latest_invoice
            );

            paymentDetails.stripe.latestInvoice = {
              id: invoice.id,
              amount: invoice.amount_paid / 100, // Convert from cents
              currency: invoice.currency,
              status: invoice.status,
              created: new Date(invoice.created * 1000),
              hostedInvoiceUrl: invoice.hosted_invoice_url,
              invoicePdf: invoice.invoice_pdf,
            };
          }
        }

        // Fetch payment history (charges)
        if (client.stripeCustomerId) {
          const charges = await stripe.charges.list({
            customer: client.stripeCustomerId,
            limit: 10,
          });

          paymentDetails.stripe.paymentHistory = charges.data.map((charge) => ({
            id: charge.id,
            amount: charge.amount / 100,
            currency: charge.currency,
            status: charge.status,
            created: new Date(charge.created * 1000),
            description: charge.description,
            receiptUrl: charge.receipt_url,
            paymentMethodDetails: {
              type: charge.payment_method_details?.type,
              brand: charge.payment_method_details?.card?.brand,
              last4: charge.payment_method_details?.card?.last4,
            },
          }));
        }
      } catch (stripeError) {
        console.error("Error fetching Stripe details:", stripeError);
        paymentDetails.stripe = {
          error: "Failed to fetch Stripe details",
          message: stripeError.message,
        };
      }
    }

    res.status(200).json(paymentDetails);
  } catch (error) {
    console.error("Error fetching payment details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  adminLogin,
  getAllOrgData,
  getAllClientData,
  getAllOrgRequest,
  getAllVolunteerData,
  getVolunteerInfo,
  getallVideoRequest,
  deteleteVideoRequest,
  getAllvideos,
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getTrainings,
  createTraining,
  updateTraining,
  deleteTraining,
  deleteVolunteer,
  approveOrg,
  updateOrg,
  deleteOrg,
  deleteClient,
  uploadVideo,
  getVideo,
  toggleVideoApproval,
  uploadThumbnailToVimeo,
  createAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
  getClientPaymentDetails,
  getVimeoUploadTicket,
  getVimeoVideoDetails,
};
