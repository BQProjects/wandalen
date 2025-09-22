const ClientModel = require("../models/clientModel");
const crypto = require("crypto");
const smsStoreModel = require("../models/smsStoreModel");
const ReviewModel = require("../models/reviewModel");
const VideoModel = require("../models/videoModel");
const VideoRequestModel = require("../models/videoRequestModel");
const bcrypt = require("bcrypt");
const CommentModel = require("../models/commentModel");

const clientLogin = async (req, res) => {
  const { email, password } = req.body;
  // Get IP address (supports proxies)
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] || // If behind proxy
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

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const store = new smsStoreModel({
      email,
      otp,
    });

    await store.save();

    // TODO: Send OTP via email/SMS (use org.contactPersonEmail or org.email)
    console.log(`OTP for ${email}: ${otp}, IP: ${ip}`);

    res.json({ message: "OTP sent to your email", ip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const clientSignUp = async (req, res) => {
  const { firstName, lastName, email, password, endDate } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newClient = new ClientModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      subscriptionType: "self",
      startDate: new Date(),
      endDate: new Date(endDate),
    });
    await newClient.save();
    res.status(201).json({ message: "Client registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllvideos = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  try {
    const videos = await VideoModel.find({
      title: { $regex: search, $options: "i" },
    })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await VideoModel.countDocuments({
      title: { $regex: search, $options: "i" },
    });

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
    const newReview = new ReviewModel({
      username: client.firstName,
      rating,
      review,
      video: vidoId,
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
  try {
    const video = await VideoModel.findById(videoId).populate("reviews");
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json({ reviews: video.reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getVideo = async (req, res) => {
  const { videoId } = req.params;
  try {
    const video = await VideoModel.findById(videoId).populate("comments");
    if (!video) return res.status(404).json({ message: "Video not found" });
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
  try {
    const video = await VideoModel.findById(videoId);
    if (!video.likes) {
      video.likes = 0;
    }
    video.likes += 1;
    await video.save();
    res.json({ message: "Like added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addComment = async (req, res) => {
  const { videoId } = req.params;
  const { username, comment, stars, userId } = req.body;
  try {
    const video = await VideoModel.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });
    const newComment = new CommentModel({
      userName: username,
      commentText: comment,
      stars,
      userId,
    });
    await newComment.save();
    video.comments.push(newComment._id);

    await video.save();
    res.json({ message: "Comment added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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
  addComment,
};
