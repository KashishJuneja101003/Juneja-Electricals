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
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  brand: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
