const { Cashfree } = require("cashfree-pg");

const cashfree = new Cashfree(
  Cashfree.SANDBOX,
  process.env.CASHFREE_CLIENT_ID,
  process.env.CASHFREE_CLIENT_SECRET
);

router.post("/create-order", verifyToken, async (req, res) => {
  try {
    const { amount } = req.body;
    const orderId = `order_${Date.now()}`;
    
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: "User Not Found" });

    const data = {
      order_amount: amount,
      order_currency: "INR",
      order_id: orderId,
      order_note: "Order payment at Juneja Electricals",
      customer_details: {
        customer_id: req.user.userId,
        customer_email: user.email || "demo@email.com",
        customer_name: user.name || "Customer",
        customer_phone: user.phone || "9999999999",
      },
      order_meta: {
        return_url: `https://junejaelectricals.netlify.app/payment-success?order_id=${orderId}`,
      },
    };

    // ✅ Correct method call
    const response = await cashfree.PG.createOrder(data);

    console.log("✅ Cashfree order created:", response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "❌ Cashfree Order Creation Error:",
      error.response?.status,
      error.response?.data || error.message
    );
    return res.status(500).json({ error: "Failed to create order" });
  }
});
