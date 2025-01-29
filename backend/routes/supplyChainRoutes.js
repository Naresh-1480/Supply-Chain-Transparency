// supplyChainRoutes.js
const express = require("express");
const router = express.Router();
const supplyChainController = require("../controllers/supplyChainController");

// Route to add a new product to the supply chain
router.post("/addProduct", supplyChainController.addProduct);

// Route to get all products
router.get("/getProducts", supplyChainController.getProducts);

// Route to get product info by QR code data
router.get("/getProductInfo/:qrCodeData", supplyChainController.getProductInfo);

module.exports = router;
