const express = require("express");
const router = express.Router();

const Product = require("../models/Product");


// GET ВСЕ ТОВАРЫ
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// POST СОЗДАТЬ ТОВАР
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);

    const saved = await product.save();

    res.json(saved);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "Ошибка сохранения товара"
    });
  }
});


// PUT ИЗМЕНИТЬ ТОВАР
router.put("/:id", async (req, res) => {
  try {

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        msg: "Товар не найден"
      });
    }

    res.json(updated);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Ошибка обновления товара"
    });
  }
});


// DELETE УДАЛИТЬ ТОВАР
router.delete("/:id", async (req, res) => {
  try {

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      msg: "Товар удалён"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Ошибка удаления товара"
    });
  }
});


module.exports = router;