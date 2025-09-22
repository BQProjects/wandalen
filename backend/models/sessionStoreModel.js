const mongoose = require("mongoose");

const sessionStoreSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true,
  },
  data: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // Session expires after 24 hours
  },
  email: {
    type: String,
  },
  expiresAt: { type: Date, required: true },
});

// ✅ Fix: reuse model if it already exists
const SessionStoreModel = mongoose.model("SessionStore", sessionStoreSchema);

module.exports = SessionStoreModel;
