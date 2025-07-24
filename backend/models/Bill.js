const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
    },
    customerId: {
        type: String,
        required: true,
    },
    customerEmail: {
        type: String, 
        unique: true,
    },
    orderDateTime:{
        type: Date,
        required: true
    },
    paymentId:{
        type: String, 
        default: null
    },
    paymentMethod:{
        type: String, 
        default: null
    },
    amount:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Bill', billSchema)