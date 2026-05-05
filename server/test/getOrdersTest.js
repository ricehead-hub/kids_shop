const axios = require('axios');

async function getOrders() {
  const response = await axios.get('http://localhost:5000/api/orders/test@mail.com');
  console.log(response.data);
}

getOrders();