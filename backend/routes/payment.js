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
        return_url: `https://junejaelectricals.netlify.app/payment-success?order_id=${orderId}`,
        // notify_url: `https://junejaelectricals.netlify.app/payment/webhook`,
        payment_methods: "cc,dc,upi",
      },
    };

    // Create order
    const response = await cf.PGCreateOrder(orderPayload);
    console.log("✅ Order created:", response.data);

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

router.post("/verify-payment", verifyToken, async (req, res) => {
  const { orderId } = req.body;

  try {
    const cf = new Cashfree(
      CFEnvironment.PRODUCTION,
      process.env.CASHFREE_CLIENT_ID,
      process.env.CASHFREE_CLIENT_SECRET
    );

    const { data: orderData } = await cf.PGFetchOrder(orderId);

    if (orderData.order_status === "PAID") {
      const user = await User.findById(req.user.userId);

      // Save bill in DB
      const bill = new Bill({
        orderId: orderId,
        customerId: user._id,
        customerEmail: user.email,
        orderDateTime: new Date(),
        paymentId: orderData.payment_id,
        amount: orderData.order_amount,
      });

      await bill.save();
      console.log("✅ Bill saved after successful payment");

      // Optionally: trigger email here

      return res.status(200).json({
        message: "Payment verified and bill created",
        bill,
      });
    } else {
      return res.status(400).json({ message: "Payment not completed" });
    }
  } catch (err) {
    console.error("❌ Payment verification failed", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
