console.log("🔥 SERVER STARTED");

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const productRoutes = require("./routes/products");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// 💥 важно для фронта
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("OK");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on", PORT);
});