const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit for thumbnails
  },
});
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
  uploadCoverImage,
  getVimeoUploadTicket,
  getVimeoVideoDetails,
} = require("../components/volunteer");
const validateActiveSession = require("../utils/middleware");

const volunteerRouter = express.Router();

volunteerRouter.use(cors());

volunteerRouter.post("/signup", volunteerSigUp);
volunteerRouter.post("/login", volunteerLogin);
volunteerRouter.post("/uploadVideos", validateActiveSession, uploadVideos);
volunteerRouter.post(
  "/upload-thumbnail-to-vimeo",
  validateActiveSession,
  upload.single("thumbnail"),
  uploadCoverImage
);
volunteerRouter.post(
  "/get-vimeo-upload-ticket",
  validateActiveSession,
  getVimeoUploadTicket
);
volunteerRouter.get(
  "/get-vimeo-video-details/:videoId",
  validateActiveSession,
  getVimeoVideoDetails
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
