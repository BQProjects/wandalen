const mongoose = require("mongoose");

const sessionStoreSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
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

const SessionStore = mongoose.model("SessionStore", sessionStoreSchema);

module.exports = SessionStore;
