const pool = require("../db/db");

exports.addProduct = async (req, res) => {
  try {
    const { name, price, stock_quantity } = req.body;

    if (!name || !price || !stock_quantity) {
      return res.status(400).json({ message: "All fields required" });
    }

    const [result] = await pool.query(
      "INSERT INTO products (name, price, stock_quantity) VALUES (?, ?, ?)",
      [name, price, stock_quantity]
    );

    res.status(201).json({ message: "Product added", id: result.insertId });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const [products] = await pool.query("SELECT * FROM products");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};