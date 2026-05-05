import { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {

  const emptyForm = {
    name: "",
    price: "",
    gender: "boy",
    age: "3-6",
    category: "одежда",
    description: "",
    image: ""
  };

  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
    setProducts(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const handle = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const save = async () => {

    const productData = {
      ...form,
      image: `/images/${form.image}`
    };

    if (editId) {
      console.log("EDIT ID:", editId);
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/products/${editId}`,
        productData
      );
    } else {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products`,
        productData
      );
    }

    setForm(emptyForm);
    setEditId(null);
    load();
  };

  const remove = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
    load();
  };

  const edit = (p) => {

    setForm({
      name: p.name || "",
      price: p.price || "",
      gender: p.gender || "boy",
      age: p.age || "3-6",
      category: p.category || "одежда",
      description: p.description || "",
      image: p.image
        ? p.image.replace("/images/", "")
        : ""
    });

    setEditId(p._id);
  };

  return (
    <div className="admin-page">

      <div className="admin-form">

        <h2 className="title">
          {editId
            ? "Редактирование товара"
            : "Добавление товара"}
        </h2>

        <div className="form-grid">

          <input
            name="name"
            value={form.name}
            onChange={handle}
            placeholder="Название"
          />

          <input
            name="price"
            value={form.price}
            onChange={handle}
            placeholder="Цена"
          />

          <input
            name="image"
            value={form.image}
            onChange={handle}
            placeholder="photo.jpg"
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handle}
          >
            <option value="boy">Мальчик</option>
            <option value="girl">Девочка</option>
            <option value="unisex">Унисекс</option>
          </select>

          <select
            name="age"
            value={form.age}
            onChange={handle}
          >
            <option value="0-2">0–2</option>
            <option value="3-6">3–6</option>
            <option value="7-10">7–10</option>
            <option value="11-14">11–14</option>
          </select>

        </div>

        <button
          className="btn primary"
          onClick={save}
        >
          {editId
            ? "Сохранить изменения"
            : "Добавить товар"}
        </button>

      </div>

      <div className="admin-grid">

        {products.map((p) => (
          <div
            className="product-card"
            key={p._id}
          >

            <img
              className="product-img"
              src={p.image || "https://picsum.photos/300"}
              alt={p.name}
            />

            <div className="product-info">
              <h3>{p.name}</h3>
              <p>{p.price} ₽</p>
            </div>

            <div className="card-actions">

              <button
                className="btn"
                onClick={() => edit(p)}
              >
                изменить
              </button>

              <button
                className="btn danger"
                onClick={() => remove(p._id)}
              >
                удалить
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default AdminPanel;