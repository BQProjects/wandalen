const smsStoreModel = require("../models/smsStoreModel");
const SessionStoreModel = require("../models/sessionStoreModel");
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

module.exports = { verifyOtp };
