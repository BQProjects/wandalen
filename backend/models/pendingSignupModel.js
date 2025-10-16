const mongoose = require("mongoose");

const { Schema } = mongoose;

const PendingSignupSchema = new Schema(
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
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNo: {
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
    postalCode: {
      type: String,
    },
    plan: {
      title: String,
      price: String,
      period: String,
    },
    stripeCheckoutSessionId: {
      type: String,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "expired"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

// Automatically delete expired pending signups after 24 hours
PendingSignupSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const PendingSignupModel = mongoose.model("PendingSignup", PendingSignupSchema);

module.exports = PendingSignupModel;
