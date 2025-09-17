const VolunteerModel = require("../models/volunteerModel");
const bcrypt = require("bcrypt");
const smsStoreModel = require("../models/smsStoreModel");

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
    });

    await store.save();

    // TODO: Send OTP via email/SMS (use org.contactPersonEmail or org.email)
    console.log(`OTP for ${email}: ${otp}, IP: ${req.ip}`);

    res.json({ message: "OTP sent to your email" });
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
    volunteerId,
    location,
    description,
    session,
    nature,
    sound,
    animals,
    tags,
    imgUrl,
    duration,
    requested,
  } = req.body;
  try {
    const newVideo = new VideoModel({
      title,
      url,
      uploadedBy: volunteerId,
      uploaderModel: "Volunteer",
      location,
      description,
      session,
      nature,
      sound,
      animals,
      tags,
      imgUrl,
      duration,
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

module.exports = {
  volunteerLogin,
  volunteerSigUp,
  uploadVideos,
  selfUploaded,
  editVideoInfo,
  getAllRequests,
};
