const OrgModel = require("../models/orgModel");

const bcrypt = require("bcrypt");
const crypto = require("crypto");
const smsStoreModel = require("../models/smsStoreModel");
const ClientModel = require("../models/clientModel");
const { sendEmail, emailTemplates } = require("../services/emailService");

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
    if (!org.password || org.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(201).json(org);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const orgSignUp = async (req, res) => {
  const {
    organizationName,
    contactEmail,
    phone,
    address,
    street,
    postalCode,
    city,
    website,
    orgFullName,
    orgJobTitle,
    orgEmailAddress,
    orgPhoneContact,
    fullName,
    jobTitle,
    emailAddress,
    phoneContact,
    totalClients,
    numberLocations,
    soortZorgorganisatie,
    estimatedClients,
    startDate,
    onboardingSupport,
    onboardingExplanation,
    additionalServices,
    notes,
    agreeToTerms,
    newsletter,
  } = req.body;

  try {
    const newOrg = new OrgModel({
      orgName: organizationName,
      email: contactEmail, // main email from organization details
      password: "", // maybe auto-generated or handled later
      phoneNo: phone,
      address: address,
      postal: postalCode,
      city: city,
      website,
      contactPerson: {
        fullName: fullName, // contact person
        jobTitle: jobTitle,
        email: emailAddress,
        phoneNumber: phoneContact,
      },
      organizationDetails: {
        fullName: orgFullName,
        jobTitle: orgJobTitle,
        email: orgEmailAddress,
        phoneNumber: orgPhoneContact,
      },
      totalClients: totalClients,
      targetGroup: [], // soortZorgorganisatie is separate
      numberOfLocations: numberLocations,
      estimatedUsers: estimatedClients,
      desiredStartDate: new Date(startDate),
      needIntegrationSupport: onboardingSupport === "Yes",
      additionalServices,
      notes,
      soortZorgorganisatie,
      newsletter,
      requestStates: "requested",
    });

    await newOrg.save();
    console.log("New organization registered:", newOrg);

    // Send emails after successful organization creation
    try {
      const adminEmail = "crc6892@gmail.com";

      // Send email to user
      await sendEmail(
        newOrg.contactPerson?.email || newOrg.email,
        "Quote Request Received - Virtual Wandlen",
        emailTemplates.quoteRequestUser(newOrg)
      );

      // Send email to admin
      if (adminEmail) {
        await sendEmail(
          adminEmail,
          "New Quote Request - Virtual Wandlen",
          emailTemplates.quoteRequestAdmin(newOrg)
        );
      }

      console.log("Organization signup emails sent successfully");
    } catch (emailError) {
      console.error("Error sending organization signup emails:", emailError);
      // Don't fail the request if email sending fails
    }

    return res.status(201).json(newOrg);
  } catch (error) {
    console.error("Org sign-up error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const addClient = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    orgId,
    phoneNo,
    startDate,
    endDate,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newClient = new ClientModel({
      firstName,
      lastName,
      email,
      phoneNo: phoneNo,
      password: hashedPassword,
      plainPassword: password,
      orgId,
      subscriptionType: "org",
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : null,
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

  // Convert string dates to Date objects
  if (updateData.startDate) {
    updateData.startDate = new Date(updateData.startDate);
  }
  if (updateData.endDate) {
    updateData.endDate = new Date(updateData.endDate);
  }

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
    const clients = await ClientModel.find({ orgId: orgId }).populate("orgId");
    res.json(clients);
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

const uploadProfilePicture = async (req, res) => {
  const { orgId } = req.params;
  const { profilePicUrl } = req.body;

  try {
    const org = await OrgModel.findById(orgId);
    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }

    org.profilePic = profilePicUrl;
    await org.save();

    res.json({
      message: "Profile picture updated successfully",
      profilePic: org.profilePic,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updatePassword = async (req, res) => {
  const { orgId } = req.params;
  const { newPassword } = req.body;

  try {
    const org = await OrgModel.findById(orgId);
    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }

    // For organizations, we might not use bcrypt since they seem to use plain passwords
    // Check if the current org uses hashed passwords or plain passwords
    org.password = newPassword; // Keeping it simple as per current org login logic
    await org.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteAccount = async (req, res) => {
  const { orgId } = req.params;

  try {
    const org = await OrgModel.findByIdAndDelete(orgId);

    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.json({ message: "Organization account deleted successfully" });
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
  uploadProfilePicture,
  updatePassword,
  deleteAccount,
};
