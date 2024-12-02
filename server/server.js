const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const combinedRoutes = require('./routes/index');

dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

//combined routes
app.use('/api', combinedRoutes); 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Failed to connect to MongoDB', err));

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
