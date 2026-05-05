require("dotenv").config();
console.log("🔥 SERVER STARTED");

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/products");

const app = express();

// 1. Подключаемся к БД
const startServer = async () => {
  try {
    await connectDB();

    // 2. Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // 3. Маршруты
    app.use("/api/products", productRoutes);
    app.get("/", (req, res) => {
      res.send("OK");
    });

    // 4. Запуск сервера (только один раз!)
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log("Server running on", PORT);
    });
  } catch (err) {
    console.log("Ошибка подключения к БД:", err);
  }
};

startServer();