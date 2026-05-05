const axios = require('axios');

async function testOrderFromCart() {
  try {
    // 1. Добавляем товар в корзину
    await axios.post('http://localhost:5000/api/cart/add', {
      userEmail: 'test@mail.com',
      item: {
        productId: '123',
        name: 'Игрушка',
        price: 500,
        quantity: 2
      }
    });

    // 2. Создаём заказ
    const orderRes = await axios.post('http://localhost:5000/api/orders', {
      userEmail: 'test@mail.com'
    });

    console.log(orderRes.data);

    // 3. Проверяем корзину (должна быть пустая)
    const cartRes = await axios.get('http://localhost:5000/api/cart/test@mail.com');
    console.log('Корзина после заказа:', cartRes.data);

  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}

testOrderFromCart();