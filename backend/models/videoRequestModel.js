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
      enum: ["Pending", "Uploading", "Uploaded"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const VideoRequestModel = mongoose.model("VideoRequest", VideoRequestSchema);
module.exports = VideoRequestModel;
