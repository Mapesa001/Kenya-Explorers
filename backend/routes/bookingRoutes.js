const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookingsController");
const { protect, adminOnly } = require("../middlewares/auth"); // ✅ Fix name here

router.post("/", protect, controller.createBooking);
router.get("/me", protect, controller.getMyBookings);
router.get("/", protect, adminOnly, controller.getAllBookings); // ✅ Use correct function
router.put("/:id/status", protect, adminOnly, controller.updateStatus);
router.delete("/:id", protect, controller.cancelBooking);

module.exports = router;
