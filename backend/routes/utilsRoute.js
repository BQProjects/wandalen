const express = require("express");
const cors = require("cors");
const {
  verifyOtp,
  resendOtp,
  subscribe,
  getAllSubscriptions,
  unsubscribe,
  striperSubscribe,
} = require("../components/utils");
const validateActiveSession = require("../utils/middleware");

const utilRouter = express.Router();

utilRouter.use(cors());

utilRouter.post("/verify-otp", verifyOtp);
utilRouter.post("/resend-otp", resendOtp);
utilRouter.post("/subscribe", subscribe);
utilRouter.get("/subscriptions", validateActiveSession, getAllSubscriptions);
utilRouter.post("/unsubscribe", unsubscribe);
utilRouter.post("/stripe-subscribe", striperSubscribe);
utilRouter.get("/verify-session/:id", striperSubscribe);

module.exports = utilRouter;
