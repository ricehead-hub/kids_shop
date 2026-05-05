const CART_KEY = "kids_shop_cart";

// получить корзину
export const getCart = () => {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

// сохранить корзину
export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// добавить товар
export const addToCart = (product) => {
  const cart = getCart();

  const existing = cart.find(item => item._id === product._id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
};

// очистить корзину
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};