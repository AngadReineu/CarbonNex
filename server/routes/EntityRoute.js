const express = require("express");
const Entity = require("../models/Entity");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const logActivity = require("../middleware/activityLogger");

const router = express.Router();

// middleware
router.use(protect);
router.use(authorize("admin"));

// ppost Entity
router.post("/", logActivity("CREATE_ENTITY"), async (req, res) => {
  try {
    const entity = await Entity.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json(entity);
  } catch (error) {
    console.error("Create entity error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get Entities
router.get("/", async (req, res) => {
  const entities = await Entity.find().sort({ createdAt: -1 });
  res.json(entities);
});
//put entities
router.put('/:id',async(req,res)=>{
  try {
    const updated = await Entity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Entity not found" });
    }

    res.json(updated);
  } catch (error) {
     console.error("Update entity error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
})

// delete Entity
router.delete("/:id", logActivity("DELETE_ENTITY"), async (req, res) => {
  await Entity.findByIdAndDelete(req.params.id);
  res.json({ message: "Entity deleted" });
});

module.exports = router;
