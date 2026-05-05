import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { addToCart } from "./cart";

function Products() {
  const [products, setProducts] = useState([]);
  const [gender, setGender] = useState("all");
  const [age, setAge] = useState("all");
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.log("Ошибка загрузки товаров", err);
    }
  };

  const filtered = products.filter((p) => {
  return (
    (gender === "all" || p.gender === gender) &&
    (age === "all" || p.age === age) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );
});

  return (
    <div className="page">

      {/* 🔍 FILTERS */}
      <div className="filters">
        <select onChange={(e) => setGender(e.target.value)}>
          <option value="all">Все</option>
          <option value="boy">Мальчик</option>
          <option value="girl">Девочка</option>
          <option value="unisex">Унисекс</option>
        </select>

        <select onChange={(e) => setAge(e.target.value)}>
          <option value="all">Возраст</option>
          <option value="0-2">0–2</option>
          <option value="3-6">3–6</option>
          <option value="7-10">7–10</option>
          <option value="11-14">11–14</option>
        </select>
      </div>

      {/* 🧸 GRID */}
      <div className="grid">
        {filtered.map((p) => (
          <div className="product-card" key={p._id}>

            <img
              className="product-img"
              src={p.image ? p.image : "https://picsum.photos/300"}
              alt={p.name}
            />

            <div className="product-info">
              <h3>{p.name}</h3>
              <p className="price">{p.price} ₽</p>
            </div>

            <button
              className="btn"
              onClick={() => addToCart(p)}
            >
              В корзину
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Products;