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

module.exports = adminRouter;
