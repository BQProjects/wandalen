const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrgSchema = new Schema(
  {
    orgName: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    address: {
      type: String,
    },
    postal: {
      type: String,
    },
    city: {
      type: String,
    },
    website: {
      type: String,
    },

    // Contact Person
    contactPerson: {
      fullName: { type: String },
      email: { type: String },
      jobTitle: { type: String },
      phoneNumber: { type: String },
    },

    // Organization & Target Group
    totalClients: { type: Number },
    targetGroup: {
      type: [String],
      enum: ["elderly", "disabled", "dementia", "other"],
      default: [],
    },
    numberOfLocations: { type: Number, default: 1 },

    // Use of Virtual Walking
    estimatedUsers: { type: Number },
    desiredStartDate: { type: Date },

    // Quotation & Setup
    needIntegrationSupport: { type: Boolean, default: false },
    additionalServices: { type: String },
    notes: { type: String },

    // System Fields
    paymentMethod: {
      type: String,
    },
    ipAddress: {
      type: [String],
      default: [],
    },
    clients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clients",
      },
    ],
    loggedStatus: {
      type: Boolean,
      default: false,
    },
    clientLimit: {
      type: Number,
      default: 1,
    },
    requestStates: {
      type: String,
      enum: ["requested", "approved", "passwordSet", "pending"],
      default: "requested",
      index: true,
    },
    amount: {
      type: Number,
    },
  },
  { timestamps: true }
);

const OrgModel = mongoose.model("Org", OrgSchema);

module.exports = OrgModel;
