const mongoose = require("mongoose");

const entitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    // category: { type: String, required: true },
     industry: { type: String, required: true },
    industryNote: { type: String },
    description:{type:String},

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  

  },
  { timestamps: true }
);

module.exports = mongoose.model("Entity", entitySchema);
