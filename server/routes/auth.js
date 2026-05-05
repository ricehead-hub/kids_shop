// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Проверяем, есть ли пользователь
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Пользователь уже существует' });

    // Хэшируем пароль
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Создаём пользователя
    user = new User({ email, password: hashedPassword });
    await user.save();

    res.json({ msg: 'Регистрация прошла успешно' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Ошибка сервера');
  }
});

// Вход пользователя
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Находим пользователя по email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Пользователь не найден' });

    // Проверяем пароль
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Неверный пароль' });

    // Возвращаем сообщение и роль (можно использовать для admin)
    res.json({ msg: 'Вход успешен', role: user.role });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Ошибка сервера');
  }
});

module.exports = router;