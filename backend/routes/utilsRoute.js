const express = require("express");
const cors = require("cors");
const { verifyOtp } = require("../components/utils");

const utilRouter = express.Router();

utilRouter.use(cors());

utilRouter.post("/verify-otp", verifyOtp);

module.exports = utilRouter;
