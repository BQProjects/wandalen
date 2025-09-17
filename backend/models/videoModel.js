const mongoose = require("mongoose");

const { Schema } = mongoose;

const VideoSchema = new Schema(
  {
    title: { type: String, required: true },
    url: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "uploaderModel", // Polymorphic reference
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
      type: Number,
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
      type: Number,
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
