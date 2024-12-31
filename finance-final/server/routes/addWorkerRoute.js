const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Worker = require('../models/Worker');

router.post("/add", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Received request to add worker:", { email, password });

    if (!email || !password) {
      console.warn("Validation failed: Missing email or password.");
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingWorker = await Worker.findOne({ email });
    if (existingWorker) {
      console.warn("Worker with this email already exists:", { email });
      return res.status(400).json({ message: "Email already exists." });
    }

    console.log("Hashing password...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Password hashed successfully.");

    const newWorker = new Worker({
      email,
      password: hashedPassword,
    });

    console.log("Saving new worker to the database:", { email, hashedPassword });
    await newWorker.save();
    console.log("Worker saved successfully.");

    res.status(201).json({ message: "Worker credentials added successfully." });
  } catch (error) {
    console.error("Error adding worker:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;