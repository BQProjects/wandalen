const express = require("express");
const cors = require("cors");
const {
  verifyOtp,
  subscribe,
  getAllSubscriptions,
  unsubscribe,
} = require("../components/utils");
const validateActiveSession = require("../utils/middleware");

const utilRouter = express.Router();

utilRouter.use(cors());

utilRouter.post("/verify-otp", verifyOtp);
utilRouter.post("/subscribe", subscribe);
utilRouter.get("/subscriptions", validateActiveSession, getAllSubscriptions);
utilRouter.post("/unsubscribe", unsubscribe);

module.exports = utilRouter;
