const express = require('express');
const path = require('path');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Simple API endpoint (Example)
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route to serve index.html for any non-API requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Set the port dynamically or default to 5000
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
