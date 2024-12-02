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
        });

        await bill.save();
        res.status(201).json(bill);
    } catch (err) {
        res.status(500).json({ message: 'Error creating bill', error: err.message });
    }
};

module.exports = {
    createBill
};
