const SessionStore = require("../models/SessionStore");

const validateActiveSession = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized: Missing header" });
  }

  // Support "Bearer <token>"
  const sessionId = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  const session = await SessionStore.findById(sessionId);

  if (!session || session.expiresAt < Date.now()) {
    return res.status(401).json({ error: "Unauthorized: No active session" });
  }

  next();
};

module.exports = validateActiveSession;
