const express = require('express');
const router = express.Router();

// Import controllers
const { registerUser, loginUser } = require('../controllers/authController');
const { getUpcomingBirthdays } = require('../controllers/birthdayController');
const { createBill } = require('../controllers/billController');  
const { protect } = require('../middleware/authMiddleware');
//const { billRoutes } = require('./billRoutes');  

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Bill routes
router.post('/bill', createBill);
//router.use('/bill', billRoutes); 

// Birthday routes
router.get('/birthdays', getUpcomingBirthdays);

module.exports = router;
