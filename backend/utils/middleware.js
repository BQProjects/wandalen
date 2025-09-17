const validateActiveSession = async (req, res, next) => {
  const session = await SessionStore.findOne({
    sessionId: req.headers.authorization,
  });

  if (!session || !session.isActive || session.expiresAt < Date.now()) {
    return res.status(401).json({ error: "Unauthorized: No active session" });
  }

  next();
};

module.exports = validateActiveSession;
