require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const adminRouter = require("./routes/adminRoute");
const orgRouter = require("./routes/orgRoute");
const clientRouter = require("./routes/clientRoutes");
const volunteerRouter = require("./routes/volunteerRoute");
const utilRouter = require("./routes/utilsRoute");
const locationRouter = require("./routes/locationRoutes");
const {
  scheduleSubscriptionRenewalCheck,
} = require("./utils/subscriptionScheduler");

const app = express();
app.set("trust proxy", true);

app.use(express.json({ limit: "50gb" }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://simplefront-iota.vercel.app",
      "http://localhost:9090",
      "https://simple-jet-eta.vercel.app",
      "https://simple-quotes-alter.vercel.app",
      "https://wandalen-nw69.vercel.app",
      "https://wandalen.vercel.app",
      "http://virtueelwandelen.nl",
    ],
  })
);
app.use(express.urlencoded({ extended: false, limit: "50gb" }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.log("Database is not Connected:", error.message);
  });

app.set("trust proxy", true);

app.use("/admin", adminRouter);
app.use("/org", orgRouter);
app.use("/client", clientRouter);
app.use("/volunteer", volunteerRouter);
app.use("/utils", utilRouter);
app.use("/api", locationRouter);

scheduleSubscriptionRenewalCheck();

app.listen(9090, () => console.log("Server is started"));

//QHsGliWUpy5I0b2E

//teja29204
