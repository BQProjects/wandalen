const express = require("express");
const cors = require("cors");
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
} = require("../components/client");

const clientRouter = express.Router();
clientRouter.use(cors());

clientRouter.post("/signup", clientSignUp);
clientRouter.post("/login", clientLogin);
clientRouter.post("/request-video", requestVideo);
clientRouter.post("/add-review", addReview);
clientRouter.get("/get-reviews/:videoId", getAllReviews);
clientRouter.get("/get-all-videos", getAllvideos);
clientRouter.get("/get-account/:clientId", getAccountInfo);
clientRouter.delete("/delete-account", deleteAccount);
clientRouter.get("/get-video/:videoId", getVideo);
clientRouter.put("/add-view/:videoId", addView);
clientRouter.put("/add-like/:videoId", addLike);
clientRouter.get("/check-like/:videoId", checkLikeStatus);
clientRouter.put("/update-account/:clientId", updateAccountInfo);
clientRouter.put("/upload-profile-picture/:clientId", uploadProfilePicture);
clientRouter.put("/update-password/:clientId", updatePassword);

module.exports = clientRouter;
