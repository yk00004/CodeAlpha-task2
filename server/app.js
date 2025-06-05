const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const authuser = require("./middlewere/auth");

// Middleware to parse JSON
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB error:', err));

// Example Route
app.get('/', (req, res) => {
    res.send('Hello from Express + MongoDB!');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
