const mongoose = require("mongoose");

const { Schema } = mongoose;

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: [{ type: { type: String }, value: String }],
    date: { type: Date, default: Date.now },
    imgUrl: { type: String },
    author: { type: String },
    downloadableResources: [{ name: String, url: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
