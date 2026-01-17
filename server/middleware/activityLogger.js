const UserActivity = require("../models/UserActivity");

module.exports = (action) => {
  return (req, res, next) => {
    res.on("finish", async () => {
      if (!req.user || res.statusCode >= 400) return;

      try {
        await UserActivity.create({
          user: req.user._id,
          action,
          path: req.originalUrl,
          method: req.method,
        });
      } catch (err) {
        console.error("Activity log error:", err.message);
      }
    });

    next();
  };
};
