require("dotenv").config({ path: "../.env" });
const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/User");
const { Cashfree } = require("cashfree-pg");

Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID;
Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.PRODUCTION;

console.log("🛡️ CASHFREE_CLIENT_ID:", process.env.CASHFREE_CLIENT_ID);
console.log("🛡️ CASHFREE_CLIENT_SECRET:", process.env.CASHFREE_CLIENT_SECRET);

router.post("/create-order", verifyToken, async (req, res) => {
  try {
    const { amount } = req.body;
    const orderId = `order_${Date.now()}`;

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const data = {
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
        return_url: `https://junejaelectricals.netlify.app/payment-success?order_id=${orderId}`,
      },
    };

    const cf = new Cashfree.PG({
      env: "PROD",
      clientId: process.env.CASHFREE_CLIENT_ID,
      clientSecret: process.env.CASHFREE_CLIENT_SECRET,
    })

    const response = await cf.orders.create(data);
    console.log("✅ Order created:", response.data);

    const paymentSessionId = response.data.order_token;

    res.status(200).json({ payment_session_id: paymentSessionId });
  } catch (error) {
    console.error("❌ Order creation failed:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to create order" });
  }
});

module.exports = router;
