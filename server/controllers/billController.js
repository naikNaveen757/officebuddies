const Bill = require('../models/Bill');
const User = require('../models/User');

// Controller to create a bill
const createBill = async (req, res) => {
    const { description, amount, participants } = req.body;
    try {
        // Find participant users by empId
        const participantUsers = await User.find({ empId: { $in: participants } });

        // Check if all participants are found
        if (participantUsers.length !== participants.length) {
            return res.status(400).json({ message: 'Some participants not found' });
        }

        // Extract the ObjectIds of participants
        const participantObjectIds = participantUsers.map(user => user._id);

        // Create a new bill
        const bill = new Bill({
            createdBy: req.user.id, // Assuming req.user.id is the logged-in user's ID
            description,
            amount,
            participants: participantObjectIds,
            status: 'unpaid', // Initial status is unpaid
        });

        // Save the bill to the database
        await bill.save();

        // Respond with the created bill
        res.status(201).json(bill);
    } catch (err) {
        res.status(500).json({ message: 'Error creating bill', error: err.message });
    }
};

// Controller to handle bill payment
const payBill = async (req, res) => {
    const { billId } = req.params; // Get billId from the URL params
    try {
        // Find the bill by ID
        const bill = await Bill.findById(billId);

        // If the bill is not found, return a 404 error
        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }

        // If the bill is already paid, return a 400 error
        if (bill.status === 'paid') {
            return res.status(400).json({ message: 'Bill is already paid' });
        }

        // Mark the bill as paid
        bill.status = 'paid';
        await bill.save();

        // Respond with the updated bill information
        res.status(200).json({ message: 'Bill paid successfully', bill });
    } catch (err) {
        res.status(500).json({ message: 'Error processing payment', error: err.message });
    }
};

module.exports = {
    createBill,
    payBill
};
