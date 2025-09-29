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
  getVolunteerInfo,
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
  approveOrg,
  updateOrg,
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
adminRouter.get("/volunteer/:id", getVolunteerInfo);
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
adminRouter.put("/approve-org/:orgId", approveOrg);
adminRouter.put("/update-org/:orgId", updateOrg);

module.exports = adminRouter;
