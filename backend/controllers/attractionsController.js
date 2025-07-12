const Attraction = require("../models/Attraction");

// Create a new attraction
exports.createAttraction = async (req, res) => {
  try {
    const attraction = new Attraction({
      ...req.body,
      createdBy: req.user?.id || null,
    });
    const saved = await attraction.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Create error:", err.message);
    res.status(500).json({ message: "Server error creating attraction" });
  }
};

// Get all attractions (with optional filters)
exports.getAllAttractions = async (req, res) => {
  try {
    const { category, region, search } = req.query;

    let query = {};

    if (category) query.category = category;
    if (region) query.region = region;
    if (search) query.title = { $regex: search, $options: "i" };

    const attractions = await Attraction.find(query).sort({ createdAt: -1 });
    res.status(200).json(attractions);
  } catch (err) {
    console.error("Get error:", err.message);
    res.status(500).json({ message: "Server error fetching attractions" });
  }
};

// Get attraction by ID
exports.getAttractionById = async (req, res) => {
  try {
    const attraction = await Attraction.findById(req.params.id);
    if (!attraction) return res.status(404).json({ message: "Not found" });
    res.json(attraction);
  } catch (err) {
    console.error("Get by ID error:", err.message);
    res.status(500).json({ message: "Error fetching attraction" });
  }
};

// Update attraction
exports.updateAttraction = async (req, res) => {
  try {
    const updated = await Attraction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ message: "Error updating attraction" });
  }
};

// Delete attraction
exports.deleteAttraction = async (req, res) => {
  try {
    const deleted = await Attraction.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Attraction deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ message: "Error deleting attraction" });
  }
};
