const VolunteerModel = require("../models/volunteerModel");
const bcrypt = require("bcrypt");
const smsStoreModel = require("../models/smsStoreModel");
const VideoModel = require("../models/videoModel");
const VideoRequestModel = require("../models/videoRequestModel");
const { sendEmail, emailTemplates } = require("../services/emailService");
const vimeoService = require("../services/vimeoService");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024 * 1024, // 50GB limit
  },
});

const volunteerLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const client = await VolunteerModel.findOne({ email }).select("+password");
    if (!client)
      return res.status(400).json({ message: "Invalid credentials email" });

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials password" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const store = new smsStoreModel({
      email,
      otp,
      who: client._id,
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

    res.json({ message: "OTP sent to your email", ip: req.ip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const volunteerSigUp = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, postal, address } =
    req.body;
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newVolunteer = new VolunteerModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      postal,
      address,
    });

    await newVolunteer.save();

    // Send emails after successful volunteer creation
    try {
      const adminEmail = "info@virtueelwandelen.nl";

      // Send email to user
      await sendEmail(
        newVolunteer.email,
        "Welkom bij Virtueel Wandelen - Vrijwilliger Registratie Bevestigd",
        emailTemplates.volunteerSignupUser(newVolunteer)
      );

      // Send email to admin
      if (adminEmail) {
        await sendEmail(
          adminEmail,
          "Nieuwe Vrijwilliger Registratie - Virtueel Wandelen",
          emailTemplates.volunteerSignupAdmin(newVolunteer)
        );
      }

      console.log("Volunteer signup emails sent successfully");
    } catch (emailError) {
      console.error("Error sending volunteer signup emails:", emailError);
      // Don't fail the request if email sending fails
    }

    res.status(201).json({ message: "Volunteer registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const uploadVideos = async (req, res) => {
  const {
    title,
    url,
    location,
    province,
    municipality,
    description,
    season,
    nature,
    sound,
    animals,
    tags,
    imgUrl,
    duration,
    id,
  } = req.body;
  try {
    const requested = false;
    //We need to add uploader info from the session
    const newVideo = new VideoModel({
      title,
      url,
      uploaderModel: "Volunteer",
      location,
      province,
      municipality,
      description,
      season,
      nature,
      sound,
      animals,
      tags,
      imgUrl,
      duration,
      uploadedBy: id,
    });
    await newVideo.save();
    if (requested) {
      await VideoRequestModel.findByIdAndUpdate(requested, {
        status: "completed",
      });
    }
    res.status(201).json({ message: "Video uploaded successfully", newVideo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const selfUploaded = async (req, res) => {
  const { volunteerId } = req.params;
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
    // Build filter query object - start with volunteer-specific filters
    const query = {
      uploadedBy: volunteerId,
      uploaderModel: "Volunteer",
    };

    // Add search filter
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // Add duration filter
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

    // Add other filters
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

const editVideoInfo = async (req, res) => {
  const { videoId } = req.params;
  const updateData = req.body;
  try {
    const updatedVideo = await VideoModel.findByIdAndUpdate(
      videoId,
      updateData,
      { new: true }
    );
    if (!updatedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.json({ message: "Video updated successfully", updatedVideo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllRequests = async (req, res) => {
  try {
    const requests = await VideoRequestModel.find().sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateRequestStatus = async (req, res) => {
  const { requestId } = req.params;
  const { status, volunteerId } = req.body;

  try {
    const updateData = { currentStatus: status };

    // If completing the request, store which volunteer completed it
    if (status === "Completed" && volunteerId) {
      updateData.completedBy = volunteerId;
    }

    const request = await VideoRequestModel.findByIdAndUpdate(
      requestId,
      updateData,
      { new: true }
    ).populate("completedBy", "firstName lastName email");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res
      .status(200)
      .json({ message: "Request status updated successfully", request });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getVideo = async (req, res) => {
  const { videoId } = req.params;
  try {
    const video = await VideoModel.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteVideo = async (req, res) => {
  const { videoId } = req.params;
  try {
    const deletedVideo = await VideoModel.findByIdAndDelete(videoId);
    if (!deletedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getProfile = async (req, res) => {
  const { volunteerId } = req.params;
  try {
    const volunteer = await VolunteerModel.findById(volunteerId).select(
      "-password"
    );
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    res.json(volunteer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const editProfile = async (req, res) => {
  const { volunteerId } = req.params;
  const updateData = req.body;
  try {
    const updatedVolunteer = await VolunteerModel.findByIdAndUpdate(
      volunteerId,
      updateData,
      { new: true }
    ).select("-password");
    if (!updatedVolunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    res.json({ message: "Profile updated successfully", updatedVolunteer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const uploadProfilePicture = async (req, res) => {
  const { volunteerId } = req.params;
  const { profilePicUrl } = req.body;

  try {
    const volunteer = await VolunteerModel.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    volunteer.profilePic = profilePicUrl;
    await volunteer.save();

    res.json({
      message: "Profile picture updated successfully",
      profilePic: volunteer.profilePic,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updatePassword = async (req, res) => {
  const { volunteerId } = req.params;
  const { newPassword } = req.body;

  try {
    const volunteer = await VolunteerModel.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    volunteer.password = hashedPassword;
    await volunteer.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteAccount = async (req, res) => {
  const { volunteerId } = req.params;

  try {
    const volunteer = await VolunteerModel.findByIdAndDelete(volunteerId);

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.json({ message: "Volunteer account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const uploadToVimeo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video file provided" });
    }

    const videoBuffer = req.file.buffer;
    const { title, description } = req.body;

    // Set up Server-Sent Events headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Cache-Control");

    // Function to send progress updates
    const sendProgress = (data) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
      if (res.flush) {
        res.flush(); // Ensure the data is sent immediately
      }
    };

    // Upload video with progress tracking
    const result = await vimeoService.uploadVideoWithProgress(
      videoBuffer,
      { title: title || "Untitled Video", description: description || "" },
      sendProgress
    );

    // Send final success message
    sendProgress({
      stage: "complete",
      success: true,
      videoId: result.videoId,
      videoUrl: result.videoUrl,
    });

    // End the response
    res.end();
  } catch (error) {
    console.error("Upload to Vimeo error:", error);

    // Send error through SSE
    res.write(
      `data: ${JSON.stringify({
        stage: "error",
        error: error.message,
      })}\n\n`
    );

    res.end();
  }
};

/**
 * Upload cover image to Vimeo
 * This endpoint uploads a thumbnail to a Vimeo video
 */
const uploadCoverImage = async (req, res) => {
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

module.exports = {
  volunteerLogin,
  volunteerSigUp,
  uploadVideos,
  selfUploaded,
  editVideoInfo,
  getAllRequests,
  updateRequestStatus,
  getVideo,
  deleteVideo,
  getProfile,
  editProfile,
  uploadProfilePicture,
  updatePassword,
  deleteAccount,
  uploadToVimeo,
  uploadCoverImage,
  upload,
};
