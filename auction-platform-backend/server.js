const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // To use environment variables from .env file

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS to allow frontend (React) to communicate with the backend
app.use(cors());

// MongoDB connection setup (using environment variable for the connection string)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if unable to connect to the database
  });

// Define a schema for auction items (example)
const auctionItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 }, // Ensure price is a positive number
});

// Create a model based on the schema
const AuctionItem = mongoose.model('AuctionItem', auctionItemSchema);

// API endpoint to get auction items (fetch from MongoDB)
app.get('/api/items', async (req, res) => {
  try {
    // Fetch auction items from the database
    const items = await AuctionItem.find();
    res.json(items); // Send JSON response to the frontend
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Error fetching items' }); // Return error if fetching fails
  }
});

// Serve static files from the React app (after building)
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route to serve index.html for any non-API requests (React router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Set the port dynamically or default to 5000
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
