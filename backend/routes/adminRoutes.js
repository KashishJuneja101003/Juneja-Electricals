const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

router.get(
  "/dashboard",
  authMiddleware,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin!" });
  }
);

// POST: Add a new product
router.post(
  "/products",
  authMiddleware,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const { name, price, category, image, brand } = req.body;
      const newProduct = new Product({ name, price, category, image, brand });
      await newProduct.save();
      res.status(201).json({ message: "Product added", product: newProduct });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// DELETE: Remove a product
router.delete(
  "/products/:id",
  authMiddleware,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const productId = req.params.id;
      await Product.findByIdAndDelete(productId);
      res.status(200).json({ message: "Product deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
