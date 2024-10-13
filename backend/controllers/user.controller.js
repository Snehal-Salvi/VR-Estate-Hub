import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Register new user (Customer by default)
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ username, email, password, role: "Customer" });
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Include user role in the response
    res.json({
      token: generateToken(user),
      role: user.role,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update user role (SuperAdmin only)
export const updateUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;

    if (!["Customer", "PropertyAdmin", "SuperAdmin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      message: `User role updated to ${role}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
