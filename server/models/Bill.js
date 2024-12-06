const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  participants: [
    {
      empId: { type: String, required: true }, 
      share: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bill", BillSchema);
