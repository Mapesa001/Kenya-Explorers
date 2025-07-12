// Load environment variables
require("dotenv").config();

// Import dependencies
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);


// Add attractionRoutes here
const attractionRoutes = require("./routes/attractionRoutes");
app.use("/api/attractions", attractionRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Kenya Explorers API running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
