const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');


// ➕ Добавить товар в корзину
router.post('/add', async (req, res) => {
  const { userEmail, item } = req.body;

  try {
    let cart = await Cart.findOne({ userEmail });

    if (!cart) {
      cart = new Cart({ userEmail, items: [item] });
    } else {
      // Проверяем, есть ли уже товар
      const existingItem = cart.items.find(i => i.productId === item.productId);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        cart.items.push(item);
      }
    }

    await cart.save();
    res.json({ msg: 'Товар добавлен в корзину' });

  } catch (err) {
    res.status(500).json({ msg: 'Ошибка корзины' });
  }
});


// 📦 Получить корзину
router.get('/:email', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userEmail: req.params.email });
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ msg: 'Ошибка получения корзины' });
  }
});


// 🗑 Очистить корзину
router.delete('/:email', async (req, res) => {
  try {
    await Cart.deleteOne({ userEmail: req.params.email });
    res.json({ msg: 'Корзина очищена' });
  } catch (err) {
    res.status(500).json({ msg: 'Ошибка удаления' });
  }
});

module.exports = router;