const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  itemType: {
    type: String,
    enum: ["attraction", "experience"],
    required: true
  },
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
  description: String,
  dateRequested: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "scheduled", "completed"],
    default: "pending"
  },
  meetLink: String,  // for virtual bookings
  totalPrice: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
