// supplyChainController.js
const Product = require('../models/Product');
const blockchain = require('../blockchain');

exports.getProductInfo = async (req, res) => {
    const qrCodeData = req.params.qrCodeData;
    try {
        const product = await Product.findOne({ qrCodeData });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const blockchainData = await blockchain.verifyProductAuthenticity(Number(qrCodeData));
        res.json({
            origin: product.origin,
            journey: product.journey,
            authenticity: blockchainData ? 'Verified' : 'Not Verified',
        });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving product info', error: err.message });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const { name, origin, journey, qrCodeData } = req.body;
        const newProduct = new Product({ name, origin, journey, qrCodeData });
        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};
