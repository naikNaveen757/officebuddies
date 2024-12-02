const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    paidStatus: { type: Boolean, default: false },
    paid: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
