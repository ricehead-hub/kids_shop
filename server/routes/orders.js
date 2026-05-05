const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// 📦 Создать заказ (из фронта)
router.post('/', async (req, res) => {
  try {
    const { userEmail, products, totalPrice } = req.body;

    const order = new Order({
      userEmail,
      products,
      totalPrice,
    });

    await order.save();

    res.json({ msg: 'Заказ оформлен' });

  } catch (err) {
    res.status(500).json({ msg: 'Ошибка заказа', error: err.message });
  }
});

// 📦 Получить заказы пользователя
router.get('/:email', async (req, res) => {
  try {
    const orders = await Order.find({ userEmail: req.params.email });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Ошибка получения заказов' });
  }
});

module.exports = router;