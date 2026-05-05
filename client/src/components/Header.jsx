import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${search}`);
  };

  const isAdmin = localStorage.getItem("userEmail") === "admin@mail.com";

  return (
    <header className="header">
      <div className="header-inner">

        {/* 🧸 ЛОГО */}
        <div className="logo" onClick={() => navigate("/")}>
          KIDS SHOP
        </div>

        {/* 🔍 ПОИСК */}
        <form className="search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit" className="search-btn">
            🔍
          </button>
        </form>

        {/* 🔗 НАВИГАЦИЯ */}
        <nav className="nav">
          <Link to="/" className="nav-btn">Каталог</Link>
          <Link to="/cart" className="nav-btn">Корзина</Link>
          <Link to="/auth" className="nav-btn">Вход</Link>

          {isAdmin && (
            <Link to="/admin" className="nav-btn admin">
              Админ
            </Link>
          )}
        </nav>

      </div>
    </header>
  );
}

export default Header;