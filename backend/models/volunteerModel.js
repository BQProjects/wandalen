const mongoose = require("mongoose");

const { Schema } = mongoose;

const VolunteerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    firstName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    postal: {
      type: String,
    },
    address: {
      type: String,
    },
    lastName: { type: String },
    password: {
      type: String,
      required: true,
      select: false,
    },
    ipAddress: {
      type: [String],
      default: [],
    },
    videosUploaded: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const VolunteerModel = mongoose.model("Volunteer", VolunteerSchema);

module.exports = VolunteerModel;
