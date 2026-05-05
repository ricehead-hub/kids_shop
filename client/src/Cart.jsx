import { useState, useEffect } from "react";
import { getCart, saveCart, clearCart } from "./cart";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const increase = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrease = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    if (!window.confirm("Удалить товар?")) return;
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const handleOrder = () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      alert("Сначала войдите");
      return;
    }
    alert("Функция оформления заказа в разработке");
  };

  return (
    <div className="page">
      <h2>🛒 Корзина</h2>

      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item._id}>
                <img
                  src={item.image}
                  className="cart-img"
                  alt={item.name}
                />
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>{item.price} ₽</p>
                  <div className="cart-controls">
                    <button onClick={() => decrease(item._id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increase(item._id)}>+</button>
                  </div>
                </div>
                <div className="cart-right">
                  <p className="price">
                    {item.price * item.quantity} ₽
                  </p>
                  <button
                    className="btn"
                    onClick={() => removeItem(item._id)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Итого: {total} ₽</h3>
            <button className="btn" onClick={handleOrder}>
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;