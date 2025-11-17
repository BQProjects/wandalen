const smsStoreModel = require("../models/smsStoreModel");
const SessionStoreModel = require("../models/sessionStoreModel.js");
const SubscriptionModel = require("../models/subscriptionModel");
const ClientModel = require("../models/clientModel");
const VolunteerModel = require("../models/volunteerModel");
const OrgModel = require("../models/orgModel");
const TestimonialModel = require("../models/testimonialModel");
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
    data: { userId: record.who, role: type },
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
        "Uw eenmalig wachtwoord voor Virtueel Wandelen",
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
            username: process.env.LAPOSTA_API_KEY,
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
      message: "Succesvol geabonneerd op onze nieuwsbrief!",
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

const sendForgotPasswordOtp = async (req, res) => {
  const { email, role } = req.body;

  try {
    // Validate role
    if (!role || !["caregiver", "volunteer", "organization"].includes(role)) {
      return res.status(400).json({ message: "Invalid or missing role" });
    }

    // Map role to model
    let UserModel;
    let userType;
    switch (role) {
      case "caregiver":
        UserModel = ClientModel;
        userType = "client";
        break;
      case "volunteer":
        UserModel = VolunteerModel;
        userType = "volunteer";
        break;
      case "organization":
        UserModel = OrgModel;
        userType = "org";
        break;
    }

    // Check if user exists in the specific model
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Delete any existing OTP records for this email and type
    await smsStoreModel.deleteMany({ email, type: "forgot-password" });

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store new OTP with type and role for forgot password
    const store = new smsStoreModel({
      email,
      otp,
      who: user._id,
      type: "forgot-password",
      role: role, // Store the role for additional security
    });
    await store.save();

    // Send OTP via email
    try {
      await sendEmail(
        email,
        "Wachtwoord resetcode - Virtueel Wandelen",
        emailTemplates.forgotPasswordOtpEmail(otp)
      );
      console.log(`Forgot password OTP sent to ${email}: ${otp}`);
    } catch (emailError) {
      console.error("Error sending forgot password OTP email:", emailError);
    }

    res.json({ message: "OTP sent to your email for password reset" });
  } catch (error) {
    console.error("Error sending forgot password OTP:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword, role } = req.body;

  try {
    // Validate role
    if (!role || !["caregiver", "volunteer", "organization"].includes(role)) {
      return res.status(400).json({ message: "Invalid or missing role" });
    }

    // Find the OTP record
    const record = await smsStoreModel
      .findOne({ email, type: "forgot-password", role: role })
      .sort({ createdAt: -1 });
    if (
      !record ||
      record.otp !== otp ||
      Date.now() > record.createdAt.getTime() + 5 * 60 * 1000
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Map role to model
    let UserModel;
    let isOrg = false;
    switch (role) {
      case "caregiver":
        UserModel = ClientModel;
        break;
      case "volunteer":
        UserModel = VolunteerModel;
        break;
      case "organization":
        UserModel = OrgModel;
        isOrg = true;
        break;
    }

    // Find user in the specific model
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Update password - hash for clients/volunteers, plain text for orgs
    let passwordToSave = newPassword;
    if (!isOrg) {
      const bcrypt = require("bcrypt");
      passwordToSave = await bcrypt.hash(newPassword, 10);
    }

    // Update password
    await UserModel.findByIdAndUpdate(user._id, { password: passwordToSave });

    // Delete the OTP record
    await smsStoreModel.findByIdAndDelete(record._id);

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const subscribeHealthcareQuote = async (req, res) => {
  const {
    email,
    organisatienaam,
    voornaam,
    achternaam,
    functie,
    telefoon,
    aantalbewoners,
  } = req.body;

  // Get client IP
  const clientIP =
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    "127.0.0.1";

  try {
    // Validate required fields
    if (!email || !organisatienaam || !voornaam) {
      return res.status(400).json({
        message: "Email, organisatienaam en voornaam zijn verplicht",
      });
    }

    // Send to LaPosta
    try {
      const bewonersMapping = {
        "2–30": "minder dan 50",
        "31–60": "50 tot 150",
        "61–90": "50 tot 150",
        ">90": "meer dan 150",
      };

      const mappedAantalBewoners =
        bewonersMapping[aantalbewoners] || aantalbewoners;

      // Build custom fields
      const customFields = {
        organisatienaam: organisatienaam,
        voornaam: voornaam,
        telefoon: telefoon || "",
        bron: "website",
      };

      // Only add achternaam if it has a value
      if (achternaam && achternaam.trim()) {
        customFields.achternaam = achternaam.trim();
      }

      // Add functie as array (matches LaPosta multiple choice field)
      if (functie && functie.trim()) {
        customFields.functie = [functie.trim()];
      }

      // Add aantalbewoners - single option field, send as string (not array)
      // LaPosta field is "Eén optie kiesbaar" (single selection)
      if (mappedAantalBewoners) {
        customFields.aantalbewoners = mappedAantalBewoners;
      }

      console.log("LaPosta custom fields being sent:", customFields); // Debug log

      const lapostaResponse = await axios.post(
        "https://api.laposta.nl/v2/member",
        {
          list_id: "t72km9raqh", // Zorginstellingen (B2B) list
          email: email,
          ip: clientIP,
          source_url: "https://virtueelwandelen.nl/request-quote",
          custom_fields: customFields,
        },
        {
          auth: {
            username: "VYgJJ2g6ihPna2pI2ZDg", // LaPosta API Key
            password: "",
          },
        }
      );
      console.log("LaPosta healthcare response:", lapostaResponse.data);
    } catch (lapostaError) {
      console.error(
        "LaPosta error:",
        lapostaError.response?.data || lapostaError.message
      );
      return res.status(500).json({
        message: "Fout bij het versturen naar LaPosta",
        error: lapostaError.response?.data || lapostaError.message,
      });
    }

    res.status(201).json({
      message:
        "Offerte aanvraag succesvol verzonden! We nemen spoedig contact met u op.",
      data: {
        email,
        organisatienaam,
        voornaam,
        achternaam,
        functie,
        telefoon,
        aantalbewoners,
      },
    });
  } catch (error) {
    console.error("Healthcare quote subscription error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const getTestimonials = async (req, res) => {
  try {
    const testimonials = await TestimonialModel.find();
    res.status(200).json(testimonials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  verifyOtp,
  resendOtp,
  subscribe,
  getAllSubscriptions,
  unsubscribe,
  sendForgotPasswordOtp,
  resetPassword,
  subscribeHealthcareQuote,
  getTestimonials,
};
