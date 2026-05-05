const axios = require('axios');

async function testCart() {
  try {
    // добавляем товар
    await axios.post('http://localhost:5000/api/cart/add', {
      userEmail: 'test@mail.com',
      item: {
        productId: '123',
        name: 'Футболка',
        price: 1000,
        quantity: 1
      }
    });

    // получаем корзину
    const res = await axios.get('http://localhost:5000/api/cart/test@mail.com');
    console.log(res.data);

  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}

testCart();