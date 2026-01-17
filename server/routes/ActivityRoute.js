const express = require("express");
const UserActivity = require("../models/UserActivity");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const filter =
      req.user.role === "admin" ? {} : { user: req.user._id };

    const activities = await UserActivity.find(filter)
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.json(activities);
  } catch (error) {
    console.error("Fetch activity error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
