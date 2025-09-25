const mongoose = require("mongoose");

const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      index: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      index: true,
    },
  },
  { timestamps: true }
);

const ReviewModel = mongoose.model("Review", ReviewSchema);
module.exports = ReviewModel;
