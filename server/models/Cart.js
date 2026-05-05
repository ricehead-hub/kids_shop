// server/models/Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number
    }
  ]
});

module.exports = mongoose.model('Cart', cartSchema);