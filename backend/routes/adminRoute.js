const express = require("express");
const cors = require("cors");
const {
  adminLogin,
  getAllOrgData,
  getAllClientData,
  getOrginfo,
  getAllOrgRequest,
  getOrgRequest,
  getAllVolunteerData,
  getallVideoRequest,
  getAllvideos,
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getTrainings,
  createTraining,
  updateTraining,
} = require("../components/admin");

const adminRouter = express.Router();
adminRouter.use(cors());

adminRouter.post("/login", adminLogin);
adminRouter.get("/all-orgs", getAllOrgData);
adminRouter.get("/all-clients", getAllClientData);
adminRouter.get("/org/:orgId", getOrginfo);
adminRouter.get("/all-requests", getAllOrgRequest);
adminRouter.get("/org-requests/:orgId", getOrgRequest);
adminRouter.get("/all-volunteers", getAllVolunteerData);
adminRouter.get("/video-req", getallVideoRequest);
adminRouter.get("/all-videos", getAllvideos);
adminRouter.get("/blogs", getAllBlogs);
adminRouter.get("/blogs/:id", getBlog);
adminRouter.post("/blogs", createBlog);
adminRouter.put("/blogs/:id", updateBlog);
adminRouter.delete("/blogs/:id", deleteBlog);
adminRouter.get("/trainings", getTrainings);
adminRouter.post("/trainings", createTraining);
adminRouter.put("/trainings/:id", updateTraining);

module.exports = adminRouter;
