const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  origin: { type: String, required: true },
  journey: { type: String, required: true },
  qrCodeData: { type: String, unique: true, required: true },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
