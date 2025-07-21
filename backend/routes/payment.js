require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middlewares/verifyToken");
const { Cashfree } = require("cashfree-pg");

const cf = new Cashfree({
  env: "PRODUCTION",
  clientId: process.env.CASHFREE_CLIENT_ID,
  clientSecret: process.env.CASHFREE_CLIENT_SECRET,
});

router.post("/create-order", verifyToken, async (req, res) => {
  try {
    const { amount } = req.body;
    const orderId = `order_${Date.now()}`;

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const orderData = {
      order_id: orderId,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: req.user.userId,
        customer_email: user.email || "demo@email.com",
        customer_name: user.name || "Customer",
        customer_phone: user.phone || "9999999999",
      },
      order_meta: {
        return_url: `https://junejaelectricals.netlify.app/payment-success?order_id={order_id}`,
      },
    };

    const response = await cf.orders.createOrder(orderData);

    console.log("✅ Order created:", response);
    res.status(200).json(response);
  } catch (error) {
    console.error(
      "❌ Order creation failed:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to create order" });
  }
});

module.exports = router;
