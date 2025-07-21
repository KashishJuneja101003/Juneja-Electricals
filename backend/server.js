require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payment");

const app = express();

// ✅ CORS configuration
const allowedOrigin = "https://junejaelectricals.netlify.app"; // your frontend

app.use(cors({
  origin: allowedOrigin,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // optional: needed only if using cookies
}));

// ✅ Explicitly handle preflight requests
app.options("*", cors({
  origin: allowedOrigin,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Body parser middleware
app.use(express.json());

// ✅ Route handlers
app.use("/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use(paymentRoutes); // /create-order will be direct route

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
