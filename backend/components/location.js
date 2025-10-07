const express = require("express");
const Location = require("../models/locationModel");

const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateLocation = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedLocation = await Location.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedLocation) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.json({ message: "Location updated successfully", updatedLocation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllLocations,
  updateLocation,
};
