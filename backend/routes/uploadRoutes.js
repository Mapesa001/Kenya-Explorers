const express = require("express");
const router = express.Router();
const { upload } = require("../services/uploadService");
const { protect } = require("../middlewares/auth");

// Upload endpoint (authenticated users)
router.post("/image", protect, upload.single("image"), (req, res) => {
  res.status(200).json({
    message: "Image uploaded successfully",
    imageUrl: req.file.path,
  });
});

module.exports = router;
