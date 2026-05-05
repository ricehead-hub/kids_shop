import { Link } from "react-router-dom";

function Navbar({ isAdmin }) {
  return (
    <div style={styles.nav}>
      <h2>👶 Kids Shop</h2>

      <div style={styles.links}>
        <Link to="/">Товары</Link>
        <Link to="/cart">🛒 Корзина</Link>

        {!localStorage.getItem("userEmail") && (
          <>
            <Link to="/login">Вход</Link>
            <Link to="/register">Регистрация</Link>
          </>
        )}

        {isAdmin && <Link to="/admin">👑 Админ</Link>}
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    background: "#f6f1ff",
    borderBottom: "1px solid #ddd"
  },
  links: {
    display: "flex",
    gap: "15px"
  }
};

export default Navbar;