const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true },  // e.g., "In Transit", "Delivered", etc.
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
