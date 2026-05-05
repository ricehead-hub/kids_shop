require("dotenv").config();
console.log("🔥 SERVER STARTED");

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// ✅ Модели (если нужны) и роуты
const productRoutes = require("./routes/products");

const app = express();

const startServer = async () => {
  try {
    // 1. Подключаем БД
    await connectDB();

    // 2. Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // 3. Маршруты API (объявляются после middleware, но до app.listen)
    app.use("/api/products", productRoutes);
    app.get("/", (req, res) => {
      res.send("OK");
    });

    // 4. Запуск сервера
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log("Server running on", PORT);
    });
  } catch (err) {
    console.log("Ошибка подключения к БД:", err);
  }
};

startServer();