const mongoose = require("mongoose");

const { Schema } = mongoose;

const TrainingSchema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    timing: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Training", TrainingSchema);
