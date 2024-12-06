const mongoose = require("mongoose");

const splitSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    price: { type: Number, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Split = mongoose.model("Split", splitSchema);
module.exports = Split;
