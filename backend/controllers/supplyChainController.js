const Product = require("../models/Product");

// Controller to add a new product to the supply chain
exports.addProduct = async (req, res) => {
  const { name, description, price, status } = req.body;
  try {
    const newProduct = new Product({ name, description, price, status });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller to get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
