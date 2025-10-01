const OrgModel = require("../models/orgModel");
const bcrypt = require("bcrypt");
const ClientModel = require("../models/clientModel");
const VolunteerModel = require("../models/volunteerModel");
const VideoModel = require("../models/videoModel");
const videoRequestModel = require("../models/videoRequestModel");
const BlogModel = require("../models/blogModel");
const TrainingModel = require("../models/trainingModel");
const { sendEmail, emailTemplates } = require("../services/emailService");

const adminLogin = (req, res) => {
  const { username, password } = req.body;
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (username === adminUsername && password === adminPassword) {
    res
      .status(200)
      .json({ message: "Admin login successful", username: adminUsername });
  } else {
    res.status(401).json({ message: "Invalid admin credentials" });
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

const getOrginfo = async (req, res) => {
  try {
    const { orgId } = req.params;
    const org = await OrgModel.findById(orgId).populate("clients");
    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.status(200).json(org);
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

const getOrgRequest = async (req, res) => {
  const { orgId } = req.params;
  try {
    const org = await OrgModel.findById(orgId)
      .populate("clients")
      .select("-password");
    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.status(200).json(org);
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
        if (d === "short" || d.includes("Short")) {
          durationConditions.push({ duration: { $lte: 5 } });
        } else if (d === "medium" || d.includes("Medium")) {
          durationConditions.push({ duration: { $gt: 5, $lte: 15 } });
        } else if (d === "long" || d.includes("Long")) {
          durationConditions.push({ duration: { $gt: 15 } });
        }
      });
      if (durationConditions.length > 0) {
        query.$or = durationConditions;
      }
    }
    if (location) {
      const locations = Array.isArray(location) ? location : [location];
      query.location = { $in: locations };
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
      .populate("uploadedBy", "firstName lastName email") // Populate volunteer info
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

const approveOrg = async (req, res) => {
  try {
    const { orgId } = req.params;
    const updates = req.body;

    // Set status to approved
    updates.requestStates = "approved";

    const updatedOrg = await OrgModel.findByIdAndUpdate(orgId, updates, {
      new: true,
    }).select("-password");

    if (!updatedOrg) {
      return res.status(404).json({ message: "Organization not found" });
    }

    // Send emails after successful approval
    try {
      const adminEmail = "crc6892@gmail.com";
      const customerEmail = updatedOrg.contactPerson?.email || updatedOrg.email;

      // Create password setup link
      const passwordLink = `${
        process.env.FRONTEND_URL || "http://localhost:5173"
      }/generate-pass/${updatedOrg._id}`;

      // Send email to customer (isUpdate = false for new approvals)
      await sendEmail(
        customerEmail,
        "Welcome to Virtual Wandlen - Your Organization Account is Approved!",
        emailTemplates.customerApprovalUser(updatedOrg, passwordLink, false)
      );

      // Send email to admin
      if (adminEmail) {
        await sendEmail(
          adminEmail,
          "Organization Account Created - Virtual Wandlen",
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

    const updatedOrg = await OrgModel.findByIdAndUpdate(orgId, updates, {
      new: true,
    }).select("-password");

    if (!updatedOrg) {
      return res.status(404).json({ message: "Organization not found" });
    }
    // Send emails after successful update
    try {
      const adminEmail = "crc6892@gmail.com";
      const customerEmail = updatedOrg.contactPerson?.email || updatedOrg.email;

      // For updates, we don't include password setup link in customer email
      const passwordLink = `${
        process.env.FRONTEND_URL || "http://localhost:5173"
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
      .populate("comments");

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

module.exports = {
  adminLogin,
  getAllOrgData,
  getAllClientData,
  getOrginfo,
  getAllOrgRequest,
  getOrgRequest,
  getAllVolunteerData,
  getVolunteerInfo,
  getallVideoRequest,
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
  approveOrg,
  updateOrg,
  uploadVideo,
  getVideo,
  toggleVideoApproval,
};
