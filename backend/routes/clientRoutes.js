const express = require("express");
const cors = require("cors");
const validateActiveSession = require("../utils/middleware");
const {
  clientSignUp,
  clientLogin,
  requestVideo,
  addReview,
  getAllReviews,
  getAllvideos,
  getAccountInfo,
  deleteAccount,
  getVideo,
  addView,
  addLike,
  updateAccountInfo,
  checkLikeStatus,
  uploadProfilePicture,
  updatePassword,
  cancelSubscription,
  syncSubscriptionWithStripe,
} = require("../components/client");

const clientRouter = express.Router();
clientRouter.use(cors());

clientRouter.post("/signup", clientSignUp);
clientRouter.post("/login", clientLogin);
clientRouter.post("/request-video", validateActiveSession, requestVideo);
clientRouter.post("/add-review", validateActiveSession, addReview);
clientRouter.get("/get-reviews/:videoId", validateActiveSession, getAllReviews);
clientRouter.get("/get-all-videos", validateActiveSession, getAllvideos);
clientRouter.get(
  "/get-account/:clientId",
  validateActiveSession,
  getAccountInfo
);
clientRouter.delete("/delete-account", validateActiveSession, deleteAccount);
clientRouter.get("/get-video/:videoId", validateActiveSession, getVideo);
clientRouter.put("/add-view/:videoId", validateActiveSession, addView);
clientRouter.put("/add-like/:videoId", validateActiveSession, addLike);
clientRouter.get(
  "/check-like/:videoId",
  validateActiveSession,
  checkLikeStatus
);
clientRouter.put(
  "/update-account/:clientId",
  validateActiveSession,
  updateAccountInfo
);
clientRouter.put(
  "/upload-profile-picture/:clientId",
  validateActiveSession,
  uploadProfilePicture
);
clientRouter.put(
  "/update-password/:clientId",
  validateActiveSession,
  updatePassword
);
clientRouter.post(
  "/cancel-subscription",
  validateActiveSession,
  cancelSubscription
);
clientRouter.post(
  "/sync-subscription/:clientId",
  validateActiveSession,
  syncSubscriptionWithStripe
);

module.exports = clientRouter;
