const mongoose = require("mongoose");
const Bill = require("../models/Bill");

const createBill = async (req, res) => {
  try {
    if (req.body.participants) {
      req.body.participants = req.body.participants.map((participant) => ({
        ...participant,
        empId: participant.empId,
      }));
    }

    // Create and save the new bill
    const newBill = new Bill(req.body);
    await newBill.save();

    res
      .status(201)
      .json({ message: "Bill created successfully", bill: newBill });
  } catch (error) {
    console.error("Error creating bill:", error);
    res.status(400).json({ message: "Failed to create bill", error });
  }
};

// Fetch all bills along with payment status
const getBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate("participants.empId");

    if (!bills) {
      return res.status(404).json({ message: "No bills found" });
    }

    return res.status(200).json({ bills });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const updatePaymentStatus = async (req, res) => {
  const { billId } = req.params;
  const { participantId } = req.body;

  try {
    const updatedBill = await Bill.findOneAndUpdate(
      { _id: billId, "participants.empId": participantId },
      { $set: { "participants.$.status": "Paid" } },
      { new: true }
    );

    if (!updatedBill) {
      return res.status(404).json({ error: "Bill or participant not found" });
    }

    res.status(200).json({
      message: `Payment status updated to "Paid" for participant ${participantId}`,
      updatedBill,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the payment status" });
  }
};

module.exports = {
  createBill,
  getBills,
  updatePaymentStatus,
};
