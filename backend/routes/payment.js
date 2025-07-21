require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");
const verifyToken = require("../middlewares/verifyToken");

const { CASHFREE_CLIENT_ID, CASHFREE_CLIENT_SECRET, CASHFREE_BASE_URL } =
  process.env;

// Debug log
if (CASHFREE_BASE_URL) console.log("URL");
else console.log("No url");
if (CASHFREE_CLIENT_ID) console.log("Id");
else console.log("No id");
if (CASHFREE_CLIENT_SECRET) console.log("Secret");
else console.log("No secret");

router.post("/create-order", verifyToken, async (req, res) => {
  try {
    console.log("🧪 Received /create-order request");
    console.log("🔐 Received token:", req.headers.authorization);
    console.log("🧾 Token user:", req.user);
    console.log("💰 Amount received:", req.body.amount);

    console.log("🔎 Looking up user with ID:", req.user.userId);

    const user = await User.findById(req.user.userId);
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ error: "User Not Found" });
    }

    console.log("✅ User found:", user.email);

    // Sanity check: are env vars actually loaded?
    console.log("🔑 CASHFREE_CLIENT_ID:", process.env.CASHFREE_CLIENT_ID);
    console.log(
      "🔑 CASHFREE_CLIENT_SECRET:",
      process.env.CASHFREE_CLIENT_SECRET
    );

    const { amount } = req.body;
    const orderId = `order_${Date.now()}`; 

    const data = {
      order_amount: amount,
      order_currency: "INR",
      order_id: orderId,
      order_note: "Order payment at Juneja Electricals",
      customer_details: {
        customer_id: req.user.userId, // required
        customer_email: user.email || "demo@email.com", // required
        customer_name: user.name || "Customer", // required
        customer_phone: user.phone || "9999999999",
      },
      order_meta: {
        return_url: `https://junejaelectricals.netlify.app/payment-success?order_id=${orderId}`,
      },
    };

    // 💥 Cashfree request
    const response = await axios.post(
      `${process.env.CASHFREE_BASE_URL}/orders`,
      data,
      {
        headers: {
          "x-api-version": "2022-09-01",
          "x-client-id": process.env.CASHFREE_CLIENT_ID,
          "x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Cashfree order created:", response.data);
    res.status(200).json({ message: "Order created!" });

    return res.json(response.data);
  } catch (error) {
    // 👇 this is the key log!
    console.error(
      "❌ Cashfree Order Creation Error:",
      error.response?.status,
      error.response?.data || error.message
    );

    return res.status(500).json({ error: "Failed to create order" });
  }
});

module.exports = router;
