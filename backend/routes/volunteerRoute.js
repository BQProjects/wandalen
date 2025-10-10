const express = require("express");
const cors = require("cors");
const {
  volunteerSigUp,
  volunteerLogin,
  uploadVideos,
  selfUploaded,
  editVideoInfo,
  getAllRequests,
  updateRequestStatus,
  getVideo,
  deleteVideo,
  getProfile,
  editProfile,
  uploadProfilePicture,
  updatePassword,
  deleteAccount,
  uploadToVimeo,
  uploadCoverImage,
  upload,
} = require("../components/volunteer");
const validateActiveSession = require("../utils/middleware");

const volunteerRouter = express.Router();

volunteerRouter.use(cors());

volunteerRouter.post("/signup", volunteerSigUp);
volunteerRouter.post("/login", volunteerLogin);
volunteerRouter.post("/uploadVideos", validateActiveSession, uploadVideos);
volunteerRouter.post(
  "/upload-to-vimeo",
  validateActiveSession,
  upload.single("video"),
  uploadToVimeo
);
volunteerRouter.post(
  "/upload-thumbnail-to-vimeo",
  validateActiveSession,
  upload.single("thumbnail"),
  uploadCoverImage
);

volunteerRouter.get(
  "/getSelfVideos/:volunteerId",
  validateActiveSession,
  selfUploaded
);
volunteerRouter.put(
  "/editVideoInfo/:videoId",
  validateActiveSession,
  editVideoInfo
);
volunteerRouter.get("/getAllRequests", validateActiveSession, getAllRequests);
volunteerRouter.put(
  "/updateRequestStatus/:requestId",
  validateActiveSession,
  updateRequestStatus
);
volunteerRouter.get("/getVideo/:videoId", validateActiveSession, getVideo);
volunteerRouter.delete(
  "/deleteVideo/:videoId",
  validateActiveSession,
  deleteVideo
);
volunteerRouter.get(
  "/getProfile/:volunteerId",
  validateActiveSession,
  getProfile
);
volunteerRouter.put(
  "/editProfile/:volunteerId",
  validateActiveSession,
  editProfile
);
volunteerRouter.put(
  "/upload-profile-picture/:volunteerId",
  validateActiveSession,
  uploadProfilePicture
);
volunteerRouter.put(
  "/update-password/:volunteerId",
  validateActiveSession,
  updatePassword
);
volunteerRouter.delete(
  "/delete-account/:volunteerId",
  validateActiveSession,
  deleteAccount
);

module.exports = volunteerRouter;
