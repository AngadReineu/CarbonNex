const mongoose = require("mongoose");

const userActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    path: String,
    method: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserActivity", userActivitySchema);
