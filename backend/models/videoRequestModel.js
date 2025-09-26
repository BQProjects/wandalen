const mongoose = require("mongoose");

const { Schema } = mongoose;

const VideoRequestSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
    },
    link: {
      type: String,
    },
    currentStatus: {
      type: String,
      enum: ["Pending", "Uploading", "Uploaded", "Completed"],
      default: "Pending",
    },
    completedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

const VideoRequestModel = mongoose.model("VideoRequest", VideoRequestSchema);
module.exports = VideoRequestModel;
