const VolunteerModel = require("../models/volunteerModel");
const bcrypt = require("bcrypt");
const smsStoreModel = require("../models/smsStoreModel");
const VideoModel = require("../models/videoModel");
const VideoRequestModel = require("../models/videoRequestModel");

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

    // TODO: Send OTP via email/SMS (use org.contactPersonEmail or org.email)
    console.log(`OTP for ${email}: ${otp}, IP: ${req.ip}`);

    res.json({ message: "OTP sent to your email", ip: req.ip, otp }); // Send OTP in response for testing (remove in production)
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
  try {
    await VideoModel.find({
      uploadedBy: volunteerId,
      uploaderModel: "Volunteer",
    })
      .then((videos) => {
        res.json(videos);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Server error" });
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
};
