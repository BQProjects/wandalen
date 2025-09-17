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
} = require("../components/client");

const clientRouter = express.Router();
clientRouter.use(cors());

clientRouter.post("/signup", clientSignUp);
clientRouter.post("/login", clientLogin);
clientRouter.post("/request-video", requestVideo);
clientRouter.post("add-review", addReview);
clientRouter.get("/get-reviews/:videoId", getAllReviews);
clientRouter.get("/get-all-videos/:page/:limit/:search?", getAllvideos);
clientRouter.get("/get-account/:clientId", getAccountInfo);
clientRouter.delete("/delete-account", deleteAccount);

module.exports = clientRouter;
