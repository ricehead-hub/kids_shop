const axios = require('axios');

async function createOrder() {
  try {
    const response = await axios.post('http://localhost:5000/api/orders', {
      userEmail: 'test@mail.com',
      products: [
        { name: 'Футболка', price: 1000, quantity: 2 }
      ],
      totalPrice: 2000
    });

    console.log(response.data);
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}

createOrder();