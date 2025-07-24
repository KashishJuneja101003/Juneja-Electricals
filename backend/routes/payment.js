require("dotenv").config({ path: "../.env" });
const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/User");
const { Cashfree, CFEnvironment } = require("cashfree-pg");
const Bill = require("../models/Bill");

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
        // return_url: `https://junejaelectricals.netlify.app/payment-success?order_id=${orderId}`,
        // notify_url: `https://junejaelectricals.netlify.app/payment/webhook`,
        payment_methods: "cc,dc,upi",
      },
    };

    // Create order
    const response = await cf.PGCreateOrder(orderPayload);
    console.log("✅ Order created:", response.data);

    // Creating bill
    const bill = new Bill({
      order_id: orderId,
      customerId: customer_id || req.user.userId,
      customerEmail: customer_email || user.email,
      orderDateTime: new Date(),
      paymentId: payment_id || "N/A",
      paymentMethod: payment_method || "Not Provided",
      amount,
    });

    await bill.save();
    console.log("✅ Bill Generated:");

    // Send response to frontend
    if (response.data.payment_session_id) {
      res.status(200).json({
        success: true,
        message: "Order created successfully",
        order_id: response.data.order_id,
        paymentUrl: response.data.payment_link,
        payment_session_id: response.data.payment_session_id,
      });
    } else {
      throw new Error("Failed to create payment_session_id");
    }
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
