const express = require("express");
const router = express.Router();
const supplyChainController = require("../controllers/supplyChainController");

// Route to add a new product to the supply chain
router.post("/addProduct", supplyChainController.addProduct);

// Route to get all products
router.get("/getProducts", supplyChainController.getProducts);

module.exports = router;
