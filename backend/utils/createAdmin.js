require("dotenv").config();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");

const createAdmin = async () => {
  await connectDB();

  const adminEmail = "admin@kenyaexplorers.com";
  const adminPhone = "+254700000000"; // Use a real valid phone format
  const adminPassword = "Admin123!";

  const existingAdmin = await User.findOne({ email: adminEmail });

  if (existingAdmin) {
    console.log("✅ Admin already exists.");
    return process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = new User({
    fullName: "Super Admin",
    email: adminEmail,
    password: hashedPassword,
    phone: adminPhone,
    role: "admin",
  });

  await admin.save();
  console.log("✅ Admin user created successfully!");
  process.exit(0);
};

createAdmin().catch((err) => {
  console.error("❌ Error creating admin:", err);
  process.exit(1);
});
