const express = require("express");
const Hero = require("../models/hero");
const { protect, admin } = require("../middleware/authmiddleware");
const upload = require("../middleware/uploaddmiddlware");

const router = express.Router();

// GET all slides - Public
router.get("/", async (req, res) => {
  try {
    const slides = await Hero.find({ isActive: true }).sort({ order: 1 });
    res.json(slides);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// GET all slides including inactive - Admin
router.get("/all", protect, admin, async (req, res) => {
  try {
    const slides = await Hero.find().sort({ order: 1 });
    res.json(slides);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// CREATE slide - Admin only
router.post("/", protect, admin, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const slide = await Hero.create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      image: `/uploads/${req.file.filename}`,
      isActive: req.body.isActive !== undefined ? req.body.isActive === "true" : true,
      order: req.body.order ? Number(req.body.order) : 0,
    });

    res.status(201).json(slide);
  } catch (error) {
    res.status(400).json({ message: error.message || "Invalid Data" });
  }
});

// UPDATE slide - Admin only
router.put("/:id", protect, admin, upload.single("image"), async (req, res) => {
  try {
    const slide = await Hero.findById(req.params.id);

    if (!slide) {
      return res.status(404).json({ message: "Slide not found" });
    }

    slide.title = req.body.title ?? slide.title;
    slide.subtitle = req.body.subtitle ?? slide.subtitle;
    slide.isActive = req.body.isActive !== undefined
      ? req.body.isActive === "true"
      : slide.isActive;
    slide.order = req.body.order !== undefined ? Number(req.body.order) : slide.order;

    // Update image only if new file was uploaded
    if (req.file) {
      slide.image = `/uploads/${req.file.filename}`;
    }

    const updated = await slide.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message || "Update failed" });
  }
});

// DELETE slide - Admin only
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const slide = await Hero.findById(req.params.id);

    if (!slide) {
      return res.status(404).json({ message: "Slide not found" });
    }

    await slide.deleteOne();
    res.json({ message: "Slide removed" });
  } catch (error) {
    res.status(400).json({ message: error.message || "Delete failed" });
  }
});

module.exports = router;
