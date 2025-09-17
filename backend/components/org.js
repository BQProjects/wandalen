const OrgModel = require("../models/orgModel");

const bcrypt = require("bcrypt");
const crypto = require("crypto");
const smsStoreModel = require("../models/smsStoreModel");

const orgLogin = async (req, res) => {
  const { email, password } = req.body;
  // Get IP address (supports proxies)
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] || // If behind proxy
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.connection?.socket?.remoteAddress;

  try {
    const org = await OrgModel.findOne({ email }).select("+password");
    if (!org)
      return res.status(400).json({ message: "Invalid credentials cssdc" });

    const isMatch = await bcrypt.compare(password, org.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const store = new smsStoreModel({
      email,
      otp,
    });

    await store.save();

    // TODO: Send OTP via email/SMS (use org.contactPersonEmail or org.email)
    console.log(`OTP for ${email}: ${otp}, IP: ${ip}`);

    res.json({ message: "OTP sent to your email", ip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const orgSignUp = async (req, res) => {
  const { orgName, email, phoneNo, address, contactPersonEmail } = req.body;
  try {
    const newOrg = new OrgModel({
      orgName,
      email,
      password: "",
      phoneNo,
      address,
      contactPerson: {
        email: contactPersonEmail,
      },
      requestStates: "requested",
    });
    await newOrg.save();
    res.status(201).json({ message: "Organization registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addClient = async (req, res) => {
  const { firstName, lastName, email, password, endDate, orgId } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newClient = new ClientModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      orgId,
      subscriptionType: "org",
      startDate: new Date(),
      endDate: new Date(endDate),
    });
    await newClient.save();

    const org = await OrgModel.findById(orgId);
    org.clients.push(newClient._id);
    await org.save();

    res
      .status(201)
      .json({ message: "Client registered successfully", newClient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const editClient = async (req, res) => {
  const { clientId } = req.params;
  const updateData = req.body;

  try {
    const updatedClient = await ClientModel.findByIdAndUpdate(
      clientId,
      updateData,
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json({ message: "Client updated successfully", updatedClient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteClient = async (req, res) => {
  const { clientId } = req.params;

  await ClientModel.findByIdAndDelete(clientId)
    .then((deletedClient) => {
      if (!deletedClient) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.json({ message: "Client deleted successfully", deletedClient });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    });
};

const getClients = async (req, res) => {
  const { orgId } = req.params;
  try {
    const clients = await ClientModel.find({ orgId });
    res.json({ clients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getOrgInfo = async (req, res) => {
  const { orgId } = req.params;
  try {
    const org = await OrgModel.findById(orgId).populate("clients");
    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.json({ org });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const editOrgInfo = async (req, res) => {
  const { orgId } = req.params;
  const updateData = req.body;
  try {
    OrgModel.findByIdAndUpdate(orgId, updateData, { new: true })
      .then((updatedOrg) => {
        if (!updatedOrg) {
          return res.status(404).json({ message: "Organization not found" });
        }
        res.json({ message: "Organization updated successfully", updatedOrg });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  orgLogin,
  orgSignUp,
  addClient,
  editClient,
  deleteClient,
  getClients,
  getOrgInfo,
  editOrgInfo,
};
