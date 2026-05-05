require("dotenv").config();
console.log("🔥 SERVER STARTED");

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");

console.log("✅ productRoutes загружены", typeof productRoutes);
console.log("✅ authRoutes загружены", typeof authRoutes);
console.log("✅ Модули подключены");

const app = express();

const startServer = async () => {
  try {
    await connectDB();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    console.log("✅ Регистрирую маршрут /api/products");
    app.use("/api/products", productRoutes);
    app.use("/api/auth", authRoutes);
    app.get("/", (req, res) => {
      res.send("OK");
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log("Server running on", PORT);
    });
  } catch (err) {
    console.log("Ошибка подключения к БД:", err);
  }
};

startServer();