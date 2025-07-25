// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: { // for filtering like 'Fans', 'Lights'
    type: String,
    required: true,
    enum: ['Fans', 'Lights', 'Switches', 'Wires', 'Irons', 'Pipes'], // add more as needed
  },
  price: {
    type: Number,
    required: true,
  },
  features: {
    type: [String], // list of features, can be empty
    default: [],
  },
  quantity:{
    type: Number,
    required: true
  },
  imageUrl: {
    type: String, // optional image URL for frontend
  },
  description: {
    type: String,
  },
  brand: {
    type: String,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
