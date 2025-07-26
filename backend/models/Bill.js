const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    customerId: {
        type: String,
        required: true,
    },
    customerEmail: {
        type: String, 
        required: true,
    },
    orderDateTime:{
        type: Date,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    items:{
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('Bill', billSchema)