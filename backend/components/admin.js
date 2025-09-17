const OrgModel = require("../models/orgModel");
const bcrypt = require("bcrypt");

const adminLogin = (req, res) => {
  const { username, password } = req.body;
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (username === adminUsername && password === adminPassword) {
    res
      .status(200)
      .json({ message: "Admin login successful", username: adminUsername });
  } else {
    res.status(401).json({ message: "Invalid admin credentials" });
  }
};

const getAllOrgData = async (req, res) => {
  try {
    const orgs = await OrgModel.find();
    res.status(200).json(orgs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllClientData = async (req, res) => {
  try {
    const clients = await ClientModel.find();
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getOrginfo = async (req, res) => {
  try {
    const { orgId } = req.params;
    const org = await OrgModel.findById(orgId).populate("clients");
    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.status(200).json(org);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllOrgRequest = async (req, res) => {
  try {
    const requests = await OrgModel.find({ requestStatus: "pending" })
      .populate("clients")
      .select("-password");
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getOrgRequest = async (req, res) => {
  const { orgId } = req.params;
  try {
    const org = await OrgModel.findById(orgId)
      .populate("clients")
      .select("-password");
    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.status(200).json(org);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  adminLogin,
  getAllOrgData,
  getAllClientData,
  getOrginfo,
  getAllOrgRequest,
  getOrgRequest,
};
