const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Initialize the express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // To parse JSON data in POST requests

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/supplyChain', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Could not connect to MongoDB:', error));

// Serve static files (Frontend HTML)
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes (for products, etc.)
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;

  // Sample data for product (Replace with actual DB logic)
  const product = {
    id: productId,
    origin: 'India',
    journey: 'From Rajasthan to Delhi',
    authenticity: 'Verified on Blockchain',
  };

  res.json(product);
});

// Catch-all route for any other paths, serving frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
