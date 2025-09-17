const mongoose = require("mongoose");

const { Schema } = mongoose;

const AdminSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Hide password in queries
    },
    ipAddress: {
      type: [String],
      default: [],
    },
    orgId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Org",
      },
    ],
    clientId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clients",
      },
    ],
    videosUploaded: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true }
);

const AdminModel = mongoose.model("Admin", AdminSchema);

module.exports = AdminModel;
