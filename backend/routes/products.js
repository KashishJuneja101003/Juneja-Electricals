const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const {updateProductStock} = require("../controllers/productController")

// POST: Add a product
router.post("/", async (req, res) => {
  try {
    const saved = await Product.insertMany(req.body);
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 1. GET product by ID
router.get("/id/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET all products by category
router.get("/category/:category", async (req, res) => {
  const category = req.params.category;
  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// routes/productRoutes.js
router.post('/update-stock', updateProductStock);


module.exports = router;
