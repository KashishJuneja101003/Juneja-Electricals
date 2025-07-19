const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const { CASHFREE_CLIENT_ID, CASHFREE_CLIENT_SECRET, CASHFREE_BASE_URL } =
  process.env;

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const orderId = `order_${Date.now()}`;

    const data = {
      order_amount: amount,
      order_currency: "INR",
      order_id: orderId,
      order_note: "Order payment at Juneja Electricals",
      order_meta: {
        return_url: `https://junejaelectricals.netlify.app/payment-success?order_id={order_id}`,
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
    console.error(
      "Cashfree Order Creation Error:",
      error.response?.data || error.message
    );
    console.error("Full Error:", error); // Add this line
    return res.status(500).json({ error: "Failed to create order" });
  }
});

module.exports = router;
