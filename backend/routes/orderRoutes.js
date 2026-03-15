const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     description: Returns list of all placed orders
 *     responses:
 *       200:
 *         description: Successfully retrieved orders
 */
router.get("/", orderController.getOrders);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place a new order
 *     description: Creates an order and reduces stock
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             product_id: 1
 *             quantity: 2
 *     responses:
 *       200:
 *         description: Order placed successfully
 *       400:
 *         description: Insufficient stock or invalid input
 */
router.post("/", orderController.placeOrder);

module.exports = router;