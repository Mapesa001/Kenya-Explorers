const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
} = require("../controllers/userController");

const { protect, adminOnly } = require("../middlewares/auth");

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post("/register", registerUser);

// @route   POST /api/users/login
// @desc    Login user and get token
// @access  Public
router.post("/login", loginUser);

// OPTIONAL ROUTES BELOW:

// @route   GET /api/users/profile
// @desc    Get logged-in user's profile
// @access  Private
router.get("/profile", protect, getUserProfile);

// @route   GET /api/users
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get("/", protect, adminOnly, getAllUsers);

module.exports = router;
