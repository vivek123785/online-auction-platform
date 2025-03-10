const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Test Route (GET /api/auth/test)
router.get("/test", (req, res) => {
  res.json({ message: "Auth API is working!" });
});

// 🆕 User Registration (POST /api/auth/register)
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token after successful registration
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token, // Send token on successful registration
      user: { id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    console.error("❌ Registration Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🆕 User Login (POST /api/auth/login)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Ensure JWT secret exists
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is missing in environment variables");
      return res.status(500).json({ error: "Server configuration error" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🆕 Protected User Profile (GET /api/auth/profile)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("❌ Profile Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🆕 Logout Route (Optional)
router.post("/logout", (req, res) => {
  res.json({ message: "User logged out successfully" });
});

module.exports = router;
