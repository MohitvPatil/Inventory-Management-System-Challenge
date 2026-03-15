const pool = require("../db/db");

exports.getOrders = async (req, res) => {
  try {

    const [orders] = await pool.query(`
      SELECT 
        orders.id,
        products.name AS product_name,
        orders.quantity,
        orders.total_price,
        orders.created_at
      FROM orders
      JOIN products ON orders.product_id = products.id
      ORDER BY orders.created_at DESC
    `);

    res.json(orders);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.placeOrder = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const { product_id, quantity } = req.body;

    if (quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    await connection.beginTransaction();

    const [productRows] = await connection.query(
      "SELECT * FROM products WHERE id = ? FOR UPDATE",
      [product_id]
    );

    if (productRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: "Product not found" });
    }

    const product = productRows[0];

    if (product.stock_quantity < quantity) {
      await connection.rollback();
      return res.status(400).json({ message: "Insufficient stock" });
    }

    const newStock = product.stock_quantity - quantity;
    const totalPrice = product.price * quantity;

    await connection.query(
      "UPDATE products SET stock_quantity = ? WHERE id = ?",
      [newStock, product_id]
    );

    await connection.query(
      "INSERT INTO orders (product_id, quantity, total_price) VALUES (?, ?, ?)",
      [product_id, quantity, totalPrice]
    );

    await connection.commit();

    res.json({ message: "Order placed successfully" });

  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
};