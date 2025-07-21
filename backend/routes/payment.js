require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middlewares/verifyToken");

// ✅ NEW: Import `Cashfree`, and explicitly import `orders` module
const { Cashfree, Orders } = require("cashfree-pg");

// ✅ Step 1: Initialize Cashfree
const cf = new Cashfree({
  clientId: process.env.CASHFREE_CLIENT_ID,
  clientSecret: process.env.CASHFREE_CLIENT_SECRET,
  env: "PRODUCTION", // or "SANDBOX"
});

// ✅ Step 2: Attach the `Orders` module
cf.orders = new Orders(cf);

router.post("/create-order", verifyToken, async (req, res) => {
  try {
    const { amount } = req.body;
    const orderId = `order_${Date.now()}`;

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // ✅ Step 3: Call createOrder now that cf.orders is properly initialized
    const response = await cf.orders.createOrder({
      order_id: orderId,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: req.user.userId,
        customer_email: user.email,
        customer_phone: user.phone,
        customer_name: user.name,
      },
      order_meta: {
        return_url: `https://junejaelectricals.netlify.app/payment-success?order_id={order_id}`,
      },
    });

    console.log("✅ Order created:", response);
    res.status(200).json(response);
  } catch (error) {
    console.error("❌ Order creation failed:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to create order" });
  }
});

module.exports = router;
