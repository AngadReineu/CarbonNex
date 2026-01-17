const express = require("express");
const UserActivity = require("../models/UserActivity");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


router.get("/", protect, async (req, res) => {
  try {
    const activities = await UserActivity.find({
      user: req.user._id,     
    })
      .sort({ createdAt: -1 })
      .limit(200);

    res.json(activities);
  } catch (error) {
    console.error("Fetch activity error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/log", protect, async (req, res) => {
  try {
    const { action, description, metadata = {} } = req.body;

    if (!action) {
      return res.status(400).json({ message: "Action is required" });
    }

    await UserActivity.create({
      user: req.user._id,
      action,
      description,
      metadata,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Creation Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});


module.exports = router;
