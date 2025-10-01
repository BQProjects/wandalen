const smsStoreModel = require("../models/smsStoreModel");
const SessionStoreModel = require("../models/sessionStoreModel.js");
const SubscriptionModel = require("../models/subscriptionModel");
const crypto = require("crypto");

const verifyOtp = async (req, res) => {
  const { email, otp, type } = req.body;
  const record = await smsStoreModel.findOne({ email }).sort({ createdAt: -1 });
  if (
    !record ||
    record.otp !== otp ||
    Date.now() > record.createdAt.getTime() + 5 * 60 * 1000
  ) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }
  // OTP valid, login success
  await smsStoreModel.findByIdAndDelete(record._id);

  const session = await SessionStoreModel.findOne({ email });

  // Cancel previous session if exists
  if (session) {
    await SessionStoreModel.findByIdAndDelete(session._id);
  }

  // Create new session with 24 hour expiry
  const sessionId = crypto.randomBytes(16).toString("hex");
  const newSession = new SessionStoreModel({
    sessionId,
    email,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });
  await newSession.save();

  res.json({
    message: "Login successful",
    sessionId: newSession._id,
    expires: Date.now() + 24 * 60 * 60 * 1000,
    userId: record.who,
  });
};

const subscribe = async (req, res) => {
  const { email, firstName, lastName, notes } = req.body;

  try {
    // Validate required fields
    if (!email || !firstName) {
      return res.status(400).json({
        message: "Email and first name are required",
      });
    }

    // Check if email already exists
    const existingSubscription = await SubscriptionModel.findOne({ email });
    if (existingSubscription) {
      return res.status(400).json({
        message: "This email is already subscribed to our newsletter",
      });
    }

    // Create new subscription
    const newSubscription = new SubscriptionModel({
      email,
      firstName,
      lastName,
      notes: notes || "",
    });

    await newSubscription.save();

    res.status(201).json({
      message: "Successfully subscribed to our newsletter!",
      subscription: {
        email: newSubscription.email,
        firstName: newSubscription.firstName,
        lastName: newSubscription.lastName,
        subscribedAt: newSubscription.subscribedAt,
      },
    });
  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await SubscriptionModel.find({ isActive: true }).sort(
      { createdAt: -1 }
    );

    res.json({
      subscriptions,
      total: subscriptions.length,
    });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const unsubscribe = async (req, res) => {
  const { email } = req.body;

  try {
    const subscription = await SubscriptionModel.findOneAndUpdate(
      { email },
      { isActive: false },
      { new: true }
    );

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.json({ message: "Successfully unsubscribed from newsletter" });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  verifyOtp,
  subscribe,
  getAllSubscriptions,
  unsubscribe,
};
