const Bill = require('../models/Bill');
const User = require('../models/User');

const createBill = async (req, res) => {
    const { description, amount, participants } = req.body;
    try {
        const participantUsers = await User.find({ empId: { $in: participants } });

        if (participantUsers.length !== participants.length) {
            return res.status(400).json({ message: 'Some participants not found' });
        }

        const participantObjectIds = participantUsers.map(user => user._id);

        const bill = new Bill({
            createdBy: req.user.id,
            description,
            amount,
            participants: participantObjectIds,
            status: 'unpaid',
        });

        await bill.save();

        res.status(201).json(bill);
    } catch (err) {
        res.status(500).json({ message: 'Error creating bill', error: err.message });
    }
};

const payBill = async (req, res) => {
    const { billId } = req.params;
    try {
        const bill = await Bill.findById(billId);

        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }

        if (bill.status === 'paid') {
            return res.status(400).json({ message: 'Bill is already paid' });
        }

        bill.status = 'paid';
        await bill.save();

        res.status(200).json({ message: 'Bill paid successfully', bill });
    } catch (err) {
        res.status(500).json({ message: 'Error processing payment', error: err.message });
    }
};

module.exports = {
    createBill,
    payBill
};
