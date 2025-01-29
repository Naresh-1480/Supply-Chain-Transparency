const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  origin: String,
  journey: String,
  authenticity: String, // Simulated blockchain verification status
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
