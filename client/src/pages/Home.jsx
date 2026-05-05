import Products from "../Products";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>👶 Kids Shop</h1>

      <div style={{ display: "flex", gap: 10 }}>
        <Link to="/login">Войти</Link>
        <Link to="/register">Регистрация</Link>
        <Link to="/cart">🛒 Корзина</Link>
        <Link to="/admin">👑 Админ</Link>
      </div>

      <hr />

      <Products />
    </div>
  );
}

export default Home;