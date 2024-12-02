const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { registerValidation } = require('../utils/validators/userValidator'); 

const registerUser = async (req, res) => {
    const { empId, name, email, password, dob, role } = req.body;

    const { error } = registerValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const newUser = new User({ empId, name, email, password, dob, role });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.json({ token, user: { empId: user.empId, name: user.name, email: user.email, dob: user.dob } });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};

module.exports = {
    registerUser,
    loginUser
};