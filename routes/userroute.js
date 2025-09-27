import User from "../models/User.js";
import bcrypt from "bcryptjs";  // use bcryptjs
import jwt from "jsonwebtoken";
import express, { Router } from "express";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

// Get all users
router.get("/all", async (req, res) => {
  try {
    const allusers = await User.find();
    if (allusers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(allusers);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// Register user
router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashpassword,
      role,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // ✅ fixed
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Password does not match" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
      token,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // ✅ fixed
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({ message: "Error retrieving user", error: e.message });
  }
});

export default router;
