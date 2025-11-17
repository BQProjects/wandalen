const mongoose = require("mongoose");

const { Schema } = mongoose;

const MediaSchema = new Schema(
  {
    title: { type: String, required: true },
    source: { type: String, required: true },
    link: { type: String, required: true },
    banner: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Media", MediaSchema);
