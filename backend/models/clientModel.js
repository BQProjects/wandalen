const mongoose = require("mongoose");

const { Schema } = mongoose;

const ClientSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    plainPassword: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    plan: {
      title: String,
      price: String,
      period: String,
    },
    ipAddress: {
      type: [String],
      default: [],
    },
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Org",
      index: true,
    },
    company: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    function: {
      type: String,
    },
    country: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    postal: {
      type: String,
    },
    subscriptionType: {
      type: String,
      index: true,
    },
    startDate: {
      type: Date,
      index: true,
    },
    endDate: {
      type: Date,
      index: true,
    },
    trialEndDate: {
      type: Date,
      index: true,
    },
    subscriptionDays: {
      type: Number,
      default: 0,
    },
    stripeCustomerId: {
      type: String,
      index: true,
    },
    stripeSubscriptionId: {
      type: String,
      index: true,
    },
    stripeSessionId: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "cancelled", "expired"],
      default: "pending",
      index: true,
    },
    paymentVerified: {
      type: Boolean,
      default: false,
    },
    subscriptionStatus: {
      type: String,
      enum: ["trial", "active", "cancelled", "expired"],
      default: "trial",
      index: true,
    },
    cancelledAt: {
      type: Date,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const ClientModel = mongoose.model("Clients", ClientSchema);

module.exports = ClientModel;
