import { useState } from "react";

function Orders() {
  const [email, setEmail] = useState("");

  const loadOrders = () => {
    if (!email) {
      alert("Введите email");
      return;
    }
    alert("Функция просмотра заказов в разработке");
  };

  return (
    <div>
      <h2>📦 Заказы</h2>
      <input
        placeholder="Email пользователя"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={loadOrders}>
        Показать заказы
      </button>
      <p>Функция временно недоступна</p>
    </div>
  );
}

export default Orders;