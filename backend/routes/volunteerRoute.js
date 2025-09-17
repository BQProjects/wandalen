const express = require("express");
const cors = require("cors");
const {
  volunteerSigUp,
  volunteerLogin,
  uploadVideos,
  selfUploaded,
  editVideoInfo,
  getAllRequests,
} = require("../components/volunteer");

const volunteerRouter = express.Router();

volunteerRouter.use(cors());

volunteerRouter.post("/signup", volunteerSigUp);
volunteerRouter.post("/login", volunteerLogin);
volunteerRouter.post("/uploadVideos", uploadVideos);
volunteerRouter.get("/getSelfVideos/:volunteerId", selfUploaded);
volunteerRouter.put("/editVideoInfo/:videoId", editVideoInfo);
volunteerRouter.get("/getAllRequests", getAllRequests);

module.exports = volunteerRouter;
