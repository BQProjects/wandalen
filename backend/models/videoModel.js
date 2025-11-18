const mongoose = require("mongoose");

const { Schema } = mongoose;

const VideoSchema = new Schema(
  {
    title: { type: String, required: true },
    url: {
      type: String,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
      index: true,
    },
    uploaderModel: {
      type: String,
      enum: ["Volunteer", "Admin"],
    },
    location: {
      type: String,
      index: true,
    },
    province: {
      type: String,
      index: true,
    },
    municipality: {
      type: String,
      index: true,
    },
    description: {
      type: String,
      index: true,
    },
    season: {
      type: [String],
      index: true,
    },
    nature: {
      type: [String],
      index: true,
    },
    sound: {
      type: [String],
      index: true,
    },
    animals: {
      type: [String],
      index: true,
    },
    tags: {
      type: [String],
      index: true,
    },
    customTags: {
      type: [String],
      index: true,
    },
    imgUrl: {
      type: String,
    },
    duration: {
      type: String,
      index: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    views: {
      type: Number,
      default: 0,
      index: true,
    },
    likes: {
      type: Number,
      default: 0,
      index: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

const VideoModel = mongoose.model("Video", VideoSchema);

module.exports = VideoModel;
