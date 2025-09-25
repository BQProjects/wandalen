const ClientModel = require("../models/clientModel");
const crypto = require("crypto");
const smsStoreModel = require("../models/smsStoreModel");
const ReviewModel = require("../models/reviewModel");
const VideoModel = require("../models/videoModel");
const VideoRequestModel = require("../models/videoRequestModel");
const bcrypt = require("bcrypt");
const CommentModel = require("../models/commentModel");
const LikeModel = require("../models/likeModel");
const mongoose = require("mongoose");

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
      who: client._id, // Added: Store the client ID for OTP verification
    });

    await store.save();

    // TODO: Send OTP via email/SMS (use org.contactPersonEmail or org.email)
    console.log(`OTP for ${email}: ${otp}, IP: ${ip}`);

    res.json({ message: "OTP sent to your email", ip, otp }); // Send OTP in response for testing (remove in production)
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
  } = req.body;
  try {
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
    });
    await newClient.save();
    res.status(201).json({ message: "Client registered successfully" });
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
        if (d.includes("Short")) {
          durationConditions.push({ duration: { $lte: 5 } });
        } else if (d.includes("Medium")) {
          durationConditions.push({ duration: { $gt: 5, $lte: 15 } });
        } else if (d.includes("Long")) {
          durationConditions.push({ duration: { $gt: 15 } });
        }
      });
      if (durationConditions.length > 0) {
        query.$or = durationConditions; // Use $or for multiple duration ranges
      }
    }
    if (location) {
      const locations = Array.isArray(location) ? location : [location];
      query.location = { $in: locations };
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

const updateAccountInfo = async (req, res) => {
  const clientId = req.params.clientId;
  const { firstName, lastName, phoneNo, address, postal, country, company } =
    req.body; // Only allow safe fields to update

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

    await client.save();
    res.json({ message: "Profile updated successfully", client });
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
  updateAccountInfo,
  checkLikeStatus,
};
