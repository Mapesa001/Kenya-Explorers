const express = require("express");
const router = express.Router();
const controller = require("../controllers/attractionsController");
const { protect } = require("../middlewares/auth");

// Public
router.get("/", controller.getAllAttractions);
router.get("/:id", controller.getAttractionById);

// Protected
router.post("/", protect, controller.createAttraction);
router.put("/:id", protect, controller.updateAttraction);
router.delete("/:id", protect, controller.deleteAttraction);

module.exports = router;
