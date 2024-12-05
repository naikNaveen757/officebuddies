const express = require('express');
const router = express.Router();

//controllers
const { registerUser, loginUser } = require('../controllers/authController');
const { getUpcomingBirthdays } = require('../controllers/birthdayController');
const { createBill } = require('../controllers/billController');  
const { protect } = require('../middleware/authMiddleware');
//const { billRoutes } = require('./billRoutes');  

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);


router.post('/bill', protect, createBill);
router.get('/birthdays', protect, getUpcomingBirthdays);

module.exports = router;
