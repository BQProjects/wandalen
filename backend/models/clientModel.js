const mongoose = require("mongoose");

const { Schema } = mongoose;

const ClientSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const ClientModel = mongoose.model("Clients", ClientSchema);

module.exports = ClientModel;
