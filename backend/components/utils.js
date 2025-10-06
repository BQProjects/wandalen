const smsStoreModel = require("../models/smsStoreModel");
const SessionStoreModel = require("../models/sessionStoreModel.js");
const SubscriptionModel = require("../models/subscriptionModel");
const ClientModel = require("../models/clientModel");
const VolunteerModel = require("../models/volunteerModel");
const crypto = require("crypto");
const axios = require("axios");
const { sendEmail, emailTemplates } = require("../services/emailService");

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

const resendOtp = async (req, res) => {
  const { email, type } = req.body;

  try {
    // Determine the model based on type
    let UserModel;
    if (type === "client") {
      UserModel = ClientModel;
    } else if (type === "volunteer") {
      UserModel = VolunteerModel;
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Delete any existing OTP records for this email
    await smsStoreModel.deleteMany({ email });

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store new OTP
    const store = new smsStoreModel({
      email,
      otp,
      who: user._id,
    });
    await store.save();

    // Send OTP via email
    try {
      await sendEmail(
        email,
        "Your OTP for Virtual Wandlen",
        emailTemplates.otpEmail(otp)
      );
      console.log(`OTP resent to ${email}: ${otp}`);
    } catch (emailError) {
      console.error("Error sending OTP email:", emailError);
    }

    res.json({ message: "OTP resent to your email" });
  } catch (error) {
    console.error("Error resending OTP:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const subscribe = async (req, res) => {
  const { email, firstName, lastName, notes } = req.body;

  // Get client IP
  const clientIP =
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    "127.0.0.1";
  console.log("Client IP:", clientIP);

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

    // Send to Laposta
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
          options: {
            ignore_double_optin: true,
          },
        },
        {
          auth: {
            username: process.env.LAPOSTA_API_KEY || "VYgJJ2g6ihPna2pI2ZDg",
            password: "",
          },
        }
      );
      console.log("Laposta response:", lapostaResponse.data);
    } catch (lapostaError) {
      console.error(
        "Laposta error:",
        lapostaError.response?.data || lapostaError.message
      );
      // Don't fail the subscription if Laposta fails
    }

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
  resendOtp,
  subscribe,
  getAllSubscriptions,
  unsubscribe,
};
