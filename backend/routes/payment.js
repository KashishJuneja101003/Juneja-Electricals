require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");
const verifyToken = require("../middlewares/verifyToken");

const {
  CASHFREE_CLIENT_ID,
  CASHFREE_CLIENT_SECRET,
  CASHFREE_BASE_URL = "https://sandbox.cashfree.com/pg", // fallback (optional)
} = process.env;

// Debug log
console.log("CASHFREE_BASE_URL:", CASHFREE_BASE_URL);

if (!CASHFREE_BASE_URL) {
  console.error("❌ CASHFREE_BASE_URL is not defined in environment variables");
}

router.post("/create-order", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // Fetched from token
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }

    const { amount } = req.body;
    const orderId = `order_${Date.now()}`;

    const data = {
      order_amount: amount,
      order_currency: "INR",
      order_id: orderId,
      order_note: "Order payment at Juneja Electricals",
      order_meta: {
        return_url: `https://junejaelectricals.netlify.app/payment-success?order_id=${orderId}`,
      },
    };

    const response = await axios.post(`${CASHFREE_BASE_URL}/orders`, data, {
      headers: {
        "x-api-version": "2022-09-01",
        "x-client-id": CASHFREE_CLIENT_ID,
        "x-client-secret": CASHFREE_CLIENT_SECRET,
        "Content-Type": "application/json",
      },
    });

    return res.json(response.data);
  } catch (error) {
    console.error("Cashfree Order Creation Error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to create order" });
  }
});


module.exports = router;
