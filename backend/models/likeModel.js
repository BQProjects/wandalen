const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema(
  {
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
  },
  { timestamps: true }
);

LikeSchema.index({ videoId: 1, userId: 1 }, { unique: true });

const LikeModel = mongoose.model("Like", LikeSchema);

module.exports = LikeModel;
