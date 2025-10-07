const express = require("express");
const router = express.Router();
const { getAllLocations, updateLocation } = require("../components/location");

router.get("/locations", getAllLocations);
router.put("/locations/:id", updateLocation);

module.exports = router;
