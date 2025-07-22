require("dotenv").config({ path: "../.env" });
const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/User");
const { Cashfree, CFEnvironment } = require("cashfree-pg");

router.post("/create-order", verifyToken, async (req, res) => {
  try {
    const { amount } = req.body;
    const orderId = `order_${Date.now()}`;

    // Find user from DB
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Setup Cashfree client
    const cf = new Cashfree(
      CFEnvironment.PRODUCTION, // Use CFEnvironment.SANDBOX for test mode
      process.env.CASHFREE_CLIENT_ID,
      process.env.CASHFREE_CLIENT_SECRET
    );

    // Prepare payload
    const orderPayload = {
      order_id: orderId,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: req.user.userId,
        customer_email: user.email,
        customer_phone: `+91${user.phone}`,
        customer_name: user.name,
      },
      order_meta: {
        return_url: `https://junejaelectricals.netlify.app/payment-success?order_id=${orderId}`,
      },
      payment_modes: {
        card: {},
        upi: { flow: "intent" }, // or "collect" / "qrcode"
        netbanking: {},
      },
    };

    // Create order
    const response = await cf.PGCreateOrder(orderPayload);
    console.log("✅ Order created:", response.data);

    // Send payment session ID to frontend
    res.status(200).json({
      payment_session_id:
        response.data.payment_session_id || response.data.payment_session, // backup fallback
    });
  } catch (err) {
    console.error("❌ Order creation failed:", {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
    });

    res.status(500).json({ error: "Failed to create order" });
  }
});

module.exports = router;
