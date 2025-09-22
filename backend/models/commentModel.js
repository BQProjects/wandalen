const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    commentText: {
      type: String,
    },
    stars: {
      type: Number,
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

// ✅ Fix: reuse model if it already exists
const CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = CommentModel;
