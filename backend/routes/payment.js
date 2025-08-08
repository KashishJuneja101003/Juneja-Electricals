require("dotenv").config({ path: "../.env" });
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");
// const { Cashfree, CFEnvironment } = require("cashfree-pg");
const Bill = require("../models/Bill");
const nodemailer = require("nodemailer");
const authMiddleware = require("../middlewares/authMiddleware");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADMIN,
    pass: process.env.PASS_ADMIN,
  },
});

// Cashfree Codes - Create Order and Verify Payment
// {router.post("/create-order", verifyToken, async (req, res) => {
//   try {
//     const { amount } = req.body;
//     const orderId = `order_${Date.now()}`;

//     // Find user from DB
//     const user = await User.findById(req.user.userId);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     // Setup Cashfree client
//     const cf = new Cashfree(
//       CFEnvironment.PRODUCTION, // Use CFEnvironment.SANDBOX for test mode
//       process.env.CASHFREE_CLIENT_ID,
//       process.env.CASHFREE_CLIENT_SECRET
//     );

//     // Prepare payload
//     const orderPayload = {
//       order_id: orderId,
//       order_amount: amount,
//       order_currency: "INR",
//       customer_details: {
//         customer_id: req.user.userId,
//         customer_email: user.email,
//         customer_phone: user.phone,
//         customer_name: user.name,
//       },
//       order_meta: {
//         return_url: `https://junejaelectricals.netlify.app/payment-success?order_id=${orderId}`,
//         // notify_url: `https://junejaelectricals.netlify.app/payment/webhook`,
//         payment_methods: "cc,dc,upi",
//       },
//     };

//     // Create order
//     const response = await cf.PGCreateOrder(orderPayload);
//     console.log("✅ Order created:", response.data);

//     // Send response to frontend
//     if (response.data.payment_session_id) {
//       res.status(200).json({
//         success: true,
//         message: "Order created successfully",
//         order_id: response.data.order_id,
//         paymentUrl: response.data.payment_link,
//         payment_session_id: response.data.payment_session_id,
//       });
//     } else {
//       throw new Error("Failed to create payment_session_id");
//     }
//   } catch (err) {
//     console.error("❌ Order creation failed:", {
//       message: err.message,
//       response: err.response?.data,
//       status: err.response?.status,
//     });

//     res.status(500).json({ error: "Failed to create order" });
//   }
// });

// router.post("/verify-payment", verifyToken, async (req, res) => {
//   const { orderId } = req.body;

//   try {
//     const cf = new Cashfree(
//       CFEnvironment.PRODUCTION,
//       process.env.CASHFREE_CLIENT_ID,
//       process.env.CASHFREE_CLIENT_SECRET
//     );

//     const { data: orderData } = await cf.PGFetchOrder(orderId);

//     if (orderData.order_status === "PAID") {
//       const user = await User.findById(req.user.userId);

//       // Save bill in DB
//       const bill = new Bill({
//         orderId: orderId,
//         customerId: user._id,
//         customerEmail: user.email,
//         orderDateTime: new Date(),
//         amount: orderData.order_amount,
//       });

//       await bill.save();
//       console.log("✅ Bill saved after successful payment");

//       // Activate transporter
//       transporter.verify((error, success) => {
//         if (error) {
//           console.error("❌ Email transporter failed:", error);
//         } else {
//           console.log("✅ Ready to send emails");
//         }
//       });

//       // Triggering email here
//       const mailOptions = {
//         from: process.env.EMAIL_ADMIN,
//         to: [user.email, process.env.EMAIL_ADMIN], // customer + admin
//         subject: "🧾 Payment Successful - Bill Confirmation",
//         html: `
//     <h2>Thank you for your order!</h2>
//     <p><strong>Order ID:</strong> ${orderId}</p>
//     <p><strong>Amount:</strong> ₹${orderData.order_amount}</p>
//     <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
//     <hr/>
//     <p>We've received your payment successfully. Your bill is stored in our records.</p>
//     <p>For any queries, contact junejaelectricals100@gmail.com</p>
//   `,
//       };

//       transporter.sendMail(mailOptions, (err, info) => {
//         if (err) {
//           console.error("❌ Error sending email:", err);
//         } else {
//           console.log("✅ Email sent:", info.response);
//         }
//       });

//       return res.status(200).json({
//         message: "Payment verified and bill created",
//         bill,
//       });
//     } else {
//       return res.status(400).json({ message: "Payment not completed" });
//     }
//   } catch (err) {
//     console.error("❌ Payment verification failed", err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });}

router.post("/create-order", authMiddleware, async (req, res) => {
  try {
    const { cart, amount } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(401).json({ error: "User not found or invalid token" });
    }

    console.log("User Id:", user._id);

    // 🔻 Reduce product quantity
    for (const item of cart) {
      const product = await Product.findById(item._id);

      if (!product) {
        return res
          .status(404)
          .json({ error: `Product ${item.name} not found` });
      }

      if (product.quantity < item.quantity) {
        return res
          .status(400)
          .json({ error: `Insufficient stock for ${item.name}` });
      }

      product.quantity -= item.quantity;

      // If quantity is 0, mail the admin
      if (product.quantity === 0) {
        const mailOptions = {
          from: process.env.EMAIL_ADMIN,
          to: process.env.EMAIL_ADMIN, // Send to self (admin)
          subject: `Out of Stock Alert: ${product.name}`,
          text: `
            The product "${product.name}" is now out of stock.
            Product Id: ${product._id}.
            Category: ${product.category}.
            Brand: ${product.brand}
          `,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.error("Failed to send stock alert:", err);
          } else {
            console.log("Stock alert sent:", info.response);
          }
        });
      }

      await product.save();
    }

    // ✅ Save bill
    const bill = new Bill({
      orderId: Date.now(),
      customerId: user._id,
      customerEmail: user.email,
      orderDateTime: new Date(),
      amount,
      items: cart,
    });
    await bill.save();

    // ✅ Send email
    const mailOptions = {
      from: process.env.EMAIL_ADMIN,
      to: [user.email, process.env.EMAIL_ADMIN],
      subject: "Order Confirmation - Juneja Electricals",
      html: `<h2>Order Placed</h2>
      <ul>
      ${cart.map((item) => `<li>${item.name} x ${item.quantity}</li>`).join("")}
      </ul>
      <p>
      <strong>Total:</strong> ₹${amount}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, message: "Order saved!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

module.exports = router;
