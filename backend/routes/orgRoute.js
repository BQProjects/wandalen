const express = require("express");
const cors = require("cors");
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
orgRouter.post("/addClient", addClient);
orgRouter.put("/editClient/:clientId", editClient);
orgRouter.delete("/deleteClient/:clientId", deleteClient);
orgRouter.get("/getClients/:orgId", getClients);
orgRouter.get("/getOrg/:orgId", getOrgInfo);

orgRouter.put("/editOrg/:orgId", editOrgInfo);
orgRouter.put("/upload-profile-picture/:orgId", uploadProfilePicture);
orgRouter.put("/update-password/:orgId", updatePassword);
orgRouter.delete("/delete-account/:orgId", deleteAccount);

module.exports = orgRouter;
