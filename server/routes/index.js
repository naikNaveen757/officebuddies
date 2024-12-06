const express = require("express");
const router = express.Router();

// Controllers
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/authController");
const { getUpcomingBirthdays } = require("../controllers/birthdayController");
const {
  createBill,
  getBills,
  updatePaymentStatus,
} = require("../controllers/billController");
const { protect } = require("../middleware/authMiddleware");

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/userprofile", protect, getUpcomingBirthdays);

// Bill routes
router.get("/users", protect, getUser);
router.post("/createbill", protect, createBill);
router.get("/fetchbill", protect, getBills);
router.put("/bill/:billId/pay", protect, updatePaymentStatus);


module.exports = router;
