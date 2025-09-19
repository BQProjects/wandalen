const express = require("express");
const cors = require("cors");
const {
  volunteerSigUp,
  volunteerLogin,
  uploadVideos,
  selfUploaded,
  editVideoInfo,
  getAllRequests,
  getVideo,
  deleteVideo,
  getProfile,
  editProfile,
} = require("../components/volunteer");
const validateActiveSession = require("../utils/middleware");

const volunteerRouter = express.Router();

volunteerRouter.use(cors());

volunteerRouter.post("/signup", volunteerSigUp);
volunteerRouter.post("/login", volunteerLogin);
volunteerRouter.post("/uploadVideos", validateActiveSession, uploadVideos);
volunteerRouter.get("/getSelfVideos/:volunteerId", selfUploaded);
volunteerRouter.put(
  "/editVideoInfo/:videoId",
  validateActiveSession,
  editVideoInfo
);
volunteerRouter.get("/getAllRequests", validateActiveSession, getAllRequests);
volunteerRouter.get("/getVideo/:videoId", validateActiveSession, getVideo);
volunteerRouter.delete(
  "/deleteVideo/:videoId",
  validateActiveSession,
  deleteVideo
);
volunteerRouter.get("/getProfile/:volunteerId", getProfile);
volunteerRouter.put(
  "/editProfile/:volunteerId",
  validateActiveSession,
  editProfile
);

module.exports = volunteerRouter;
