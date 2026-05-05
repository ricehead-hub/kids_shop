// server/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true }, // кто заказал
  products: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);