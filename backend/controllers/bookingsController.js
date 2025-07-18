const Booking = require("../models/Booking");
const { sendBookingEmail, sendBookingSMS } = require("../services/notificationService");
const User = require("../models/User");

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const { itemType, itemId, description, totalPrice } = req.body;

    const booking = new Booking({
      user: req.user.id,
      itemType,
      itemId,
      description,
      totalPrice
    });

    const saved = await booking.save();

    const user = await User.findById(req.user.id);

    const message = `Hi ${user.fullName}, your booking for ${itemType} has been received. Status: pending.`;

    if (user.email) {
      await sendBookingEmail(user.email, "Your Kenya Explorers Booking", message);
    }

    if (user.phone) {
      await sendBookingSMS(user.phone, message);
    }

    res.status(201).json(saved);
  } catch (err) {
    console.error("Booking error:", err.message);
    res.status(500).json({ message: "Server error creating booking" });
  }
};

// Get logged-in user's bookings
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching bookings" });
  }
};

// Get all bookings (admin only)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching all bookings" });
  }
};

// Update booking status or add meet link
exports.updateStatus = async (req, res) => {
  try {
    const { status, meetLink } = req.body;

    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, meetLink },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Booking not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating booking status" });
  }
};

// Cancel/Delete booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to cancel this booking" });
    }

    await booking.remove();
    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error cancelling booking" });
  }
};
