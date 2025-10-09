const express = require("express");
const cors = require("cors");
const {
  verifyOtp,
  resendOtp,
  subscribe,
  getAllSubscriptions,
  unsubscribe,
  sendForgotPasswordOtp,
  resetPassword,
} = require("../components/utils");
const { verifyStripePayment } = require("../components/stripeVerification");
const validateActiveSession = require("../utils/middleware");

const utilRouter = express.Router();

utilRouter.use(cors());

utilRouter.post("/verify-otp", verifyOtp);
utilRouter.post("/resend-otp", resendOtp);
utilRouter.post("/forgot-password-send-otp", sendForgotPasswordOtp);
utilRouter.post("/forgot-password-reset", resetPassword);
utilRouter.post("/subscribe", subscribe);
utilRouter.get("/subscriptions", validateActiveSession, getAllSubscriptions);
utilRouter.post("/unsubscribe", unsubscribe);
utilRouter.post("/verify-stripe-payment", verifyStripePayment);

module.exports = utilRouter;
