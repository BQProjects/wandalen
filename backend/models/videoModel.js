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
      enum: ["Volunteer", "Admin"], // Can expand if Org can upload too
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    session: {
      type: String,
    },
    nature: {
      type: String,
    },
    sound: {
      type: String,
    },
    animals: {
      type: String,
    },
    tags: {
      type: [String],
    },
    imgUrl: {
      type: String,
    },
    duration: {
      type: String,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

const VideoModel = mongoose.model("Video", VideoSchema);

module.exports = VideoModel;
