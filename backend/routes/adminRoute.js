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
  adminLogin,
  getAllOrgData,
  getAllClientData,
  getAllOrgRequest,
  getAllVolunteerData,
  getVolunteerInfo,
  getallVideoRequest,
  deteleteVideoRequest,
  getAllvideos,
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getTrainings,
  createTraining,
  updateTraining,
  deleteTraining,
  deleteVolunteer,
  approveOrg,
  updateOrg,
  deleteOrg,
  deleteClient,
  uploadVideo,
  getVideo,
  toggleVideoApproval,
  uploadThumbnailToVimeo,
  getVimeoUploadTicket,
  getVimeoVideoDetails,
  createAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
  getClientPaymentDetails,
  deleteReview,
} = require("../components/admin");
const { getAllReviews } = require("../components/client");

const adminRouter = express.Router();
adminRouter.use(cors());

adminRouter.post("/login", adminLogin);
adminRouter.get("/all-orgs", getAllOrgData);
adminRouter.get("/all-clients", getAllClientData);
adminRouter.get("/all-requests", getAllOrgRequest);
adminRouter.get("/all-volunteers", getAllVolunteerData);
adminRouter.get("/volunteer/:id", getVolunteerInfo);
adminRouter.delete("/delete-volunteer/:id", deleteVolunteer);
adminRouter.get("/video-req", getallVideoRequest);
adminRouter.delete("/video-req/:id", deteleteVideoRequest);
adminRouter.get("/all-videos", getAllvideos);
adminRouter.get("/blogs", getAllBlogs);
adminRouter.get("/blogs/:id", getBlog);
adminRouter.post("/blogs", createBlog);
adminRouter.put("/blogs/:id", updateBlog);
adminRouter.delete("/blogs/:id", deleteBlog);
adminRouter.get("/trainings", getTrainings);
adminRouter.post("/trainings", createTraining);
adminRouter.put("/trainings/:id", updateTraining);
adminRouter.delete("/trainings/:id", deleteTraining);
adminRouter.put("/approve-org/:orgId", approveOrg);
adminRouter.put("/update-org/:orgId", updateOrg);
adminRouter.delete("/delete-request/:orgId", deleteOrg);
adminRouter.delete("/delete-client/:clientId", deleteClient);
adminRouter.post("/uploadVideo", uploadVideo);
adminRouter.get("/get-video/:videoId", getVideo);
adminRouter.get("/get-reviews/:videoId", getAllReviews);
adminRouter.delete("/delete-review/:reviewId", deleteReview);
adminRouter.put("/toggle-video-approval/:videoId", toggleVideoApproval);
adminRouter.post(
  "/upload-thumbnail-to-vimeo",
  upload.single("thumbnail"),
  uploadThumbnailToVimeo
);
adminRouter.post("/get-vimeo-upload-ticket", getVimeoUploadTicket);
adminRouter.get("/get-vimeo-video-details/:videoId", getVimeoVideoDetails);
adminRouter.get("/admins", getAllAdmins);
adminRouter.post("/adminscreate", createAdmin);
adminRouter.put("/admins/:id", updateAdmin);
adminRouter.delete("/admins/:id", deleteAdmin);
adminRouter.get("/client-payment-details/:clientId", getClientPaymentDetails);

module.exports = adminRouter;
