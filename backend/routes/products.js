const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// POST: Add a product
router.post("/", async (req, res) => {
  try {
    const saved = Product.insertMany(req.body);
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: Get all products by category (e.g., Fans)
router.get("/:category", async (req, res) => {
  const category = req.params.category;
  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
