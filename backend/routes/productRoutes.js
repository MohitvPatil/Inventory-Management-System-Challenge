const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Returns list of all products with price and stock
 *     responses:
 *       200:
 *         description: Successfully retrieved products
 */
router.get("/", productController.getProducts);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add a new product
 *     description: Create a product with name, price and stock quantity
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Laptop
 *             price: 50000
 *             stock_quantity: 10
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post("/", productController.addProduct);

module.exports = router;