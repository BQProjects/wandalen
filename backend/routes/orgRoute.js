const express = require("express");
const cors = require("cors");
const validateActiveSession = require("../utils/middleware");
const {
  orgLogin,
  orgSignUp,
  addClient,
  editClient,
  deleteClient,
  getClients,
  getOrgInfo,
  editOrgInfo,
  uploadProfilePicture,
  updatePassword,
  deleteAccount,
} = require("../components/org");

const orgRouter = express.Router();

orgRouter.use(cors());

orgRouter.post("/login", orgLogin);
orgRouter.post("/signup", orgSignUp);
orgRouter.post("/addClient", validateActiveSession, addClient);
orgRouter.put("/editClient/:clientId", validateActiveSession, editClient);
orgRouter.delete(
  "/deleteClient/:clientId",
  validateActiveSession,
  deleteClient
);
orgRouter.get("/getClients/:orgId", validateActiveSession, getClients);
orgRouter.get("/getOrg/:orgId", validateActiveSession, getOrgInfo);

orgRouter.put("/editOrg/:orgId", validateActiveSession, editOrgInfo);
orgRouter.put(
  "/upload-profile-picture/:orgId",
  validateActiveSession,
  uploadProfilePicture
);
orgRouter.put("/update-password/:orgId", validateActiveSession, updatePassword);
orgRouter.delete(
  "/delete-account/:orgId",
  validateActiveSession,
  deleteAccount
);

module.exports = orgRouter;
