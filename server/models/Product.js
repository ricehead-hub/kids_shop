const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  gender: { type: String, required: true },
  age: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  image: { type: String } // 👈 ссылка на картинку
});

module.exports = mongoose.model("Product", productSchema);