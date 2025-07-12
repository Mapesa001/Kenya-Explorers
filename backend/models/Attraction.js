const mongoose = require("mongoose");

const attractionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: {
    type: String,
    required: true,
    enum: ["game park", "beach", "mountain", "lake", "museum", "cultural site"],
  },
  location: { type: String, required: true },
  region: { type: String }, // e.g., Coast, Rift Valley
  images: [String], // URLs or IPFS hashes
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },
  entryFee: { type: Number, default: 0 },
  contact: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Attraction", attractionSchema);
