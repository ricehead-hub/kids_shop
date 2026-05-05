const axios = require('axios');

async function addProduct() {
  try {
    const response = await axios.post('http://localhost:5000/api/products', {
      email: 'test@mail.com', 
      name: 'Куртка',
      price: 3000,
      gender: 'girl',
      age: '6-10',
      category: 'одежда',
      description: 'Тёплая куртка'
    });

    console.log(response.data);
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}

addProduct();