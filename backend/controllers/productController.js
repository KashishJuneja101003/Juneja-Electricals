const Product = require("../models/Product");

exports.updateProductStock = async (req, res) => {
  const items = req.body.items;

  try {
    for (const item of items) {
      const product = await Product.findById(item._id);

      if (!product) continue;

      product.stock = product.stock - item.quantity;
      if (product.stock < 0) product.stock = 0;

      await product.save();
    }

    res.status(200).json({ message: "Stock updated successfully" });
  } catch (error) {
    console.error("Stock update failed:", error);
    res.status(500).json({ message: "Stock update failed" });
  }
};
