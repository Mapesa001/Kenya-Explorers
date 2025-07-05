const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      minlength: [3, "Full name must be at least 3 characters"],
      maxlength: [100, "Full name must be at most 100 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // don't return password by default
    },
    phone: {
      type: String,
      match: [/^\+?\d{10,15}$/, "Phone must be a valid international number"],
      required: [true, "Phone number is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profilePicture: {
      type: String,
      default: "", // could store a URL to an uploaded profile pic
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
