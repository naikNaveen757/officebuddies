const express = require('express');
const router = express.Router();

// Import controllers
const { registerUser, loginUser } = require('../controllers/authController');
const { getUpcomingBirthdays } = require('../controllers/birthdayController');
const { createBill } = require('../controllers/billController');  
const { protect } = require('../middleware/authMiddleware');

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Bill routes
router.post('/bill', protect, createBill);

// Birthday routes
router.get('/birthdays', protect, getUpcomingBirthdays);

module.exports = router;
