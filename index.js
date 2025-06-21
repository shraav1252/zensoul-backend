const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load env variables from .env file

const app = express();

// Middleware
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON request bodies

// Routes
const journalRoutes = require('./routes/journalRoutes');
app.use('/api/journals', journalRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to ZenSoul Backend!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
