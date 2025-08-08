require("dotenv").config({path: "../.env"})
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payment")

const app = express();

app.use(
  cors({
    origin: "https://junejaelectricals.netlify.app", // your Netlify frontend
    credentials: true, // allow cookies/headers
  })
);

app.use(express.json());

app.use("/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use(paymentRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
