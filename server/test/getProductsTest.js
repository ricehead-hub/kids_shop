const axios = require('axios');

async function getProducts() {
  const response = await axios.get('http://localhost:5000/api/products');
  console.log(response.data);
}

getProducts();