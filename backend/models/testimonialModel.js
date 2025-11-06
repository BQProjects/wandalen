const mongoose = require("mongoose");

const { Schema } = mongoose;

const TestimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    text: { type: String, required: true },
    photo: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", TestimonialSchema);
