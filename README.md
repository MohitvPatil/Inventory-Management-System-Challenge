# Inventory Management System (IMS)

## Overview

This project implements a **Mini Inventory Management System** designed
to manage product inventory and orders while enforcing stock validation
rules.\
The system allows administrators to add products, users to view
available products, and place orders with automatic stock deduction.

The application ensures that orders cannot exceed available stock and
uses database transactions to maintain data consistency.

------------------------------------------------------------------------

## Technology Stack

Frontend: - React (JavaScript) - Axios for API integration

Backend: - Node.js - Express.js REST API

Database: - MySQL

Additional Tools: - Swagger (OpenAPI) for API documentation - MySQL
indexing for query optimization

------------------------------------------------------------------------

## Project Structure

    inventory-system
    │
    ├── backend
    │   ├── controllers
    │   │   ├── productController.js
    │   │   └── orderController.js
    │   │
    │   ├── routes
    │   │   ├── productRoutes.js
    │   │   └── orderRoutes.js
    │   │
    │   ├── db
    │   │   └── db.js
    │   │
    │   ├── swagger.js
    │   └── server.js
    │
    └── frontend
        └── src
            ├── pages
            │   ├── AddProduct.js
            │   ├── ProductList.js
            │   └── PlaceOrder.js
            │
            └── api
                └── api.js

------------------------------------------------------------------------

# Setup Instructions

## 1. Clone the repository

    git clone <repository-url>
    cd inventory-system

------------------------------------------------------------------------

## 2. Database Setup (MySQL)

Create database:

``` sql
CREATE DATABASE inventory_db;
USE inventory_db;
```

Create tables:

``` sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

Add performance indexes:

``` sql
CREATE INDEX idx_products_id ON products(id);
CREATE INDEX idx_orders_product_id ON orders(product_id);
CREATE INDEX idx_orders_created_at ON orders(created_at);
```

------------------------------------------------------------------------

## 3. Backend Setup

Navigate to backend:

    cd backend

Install dependencies:

    npm install

Run server:

    node server.js

Server will start at:

    http://localhost:5000

Swagger API documentation:

    http://localhost:5000/api-docs

------------------------------------------------------------------------

## 4. Frontend Setup

Navigate to frontend:

    cd frontend

Install dependencies:

    npm install

Start React development server:

    npm start

Frontend will run at:

    http://localhost:3000

------------------------------------------------------------------------

# API Endpoints

### Products

Add product

    POST /api/products

Get products

    GET /api/products

------------------------------------------------------------------------

### Orders

Place order

    POST /api/orders

Get all orders

    GET /api/orders

------------------------------------------------------------------------

# Business Rules Implemented

1.  Prevent ordering more than available stock
2.  Deduct stock after successful order
3.  Calculate total price automatically
4.  Use database transaction for order placement
5.  Rollback transaction if any step fails

Transaction flow:

    BEGIN TRANSACTION
    SELECT product FOR UPDATE
    VALIDATE STOCK
    UPDATE STOCK
    INSERT ORDER
    COMMIT
    ROLLBACK IF ERROR

------------------------------------------------------------------------

# AI Tools Used

The following AI tools were used during development:

-   ChatGPT (OpenAI) -- architecture guidance and implementation support
-   Claude -- architecture guidance and implementation support
-   AI-assisted debugging during API integration
-   Code structuring suggestions for backend and frontend

AI tools were used only to assist development decisions and
documentation.

------------------------------------------------------------------------

# Prompts Used During Development

Examples of structured prompts used while developing the system:

### Backend Architecture Prompt

"Design a RESTful inventory management backend using Node.js, Express,
and MySQL that supports product creation, product listing, and order
placement with stock validation and database transactions."

### Database Transaction Prompt

"Implement a MySQL transaction for an order placement system where
product stock must be validated before order insertion and rolled back
if stock is insufficient."

### Frontend Integration Prompt

"Create a React interface that fetches products using Axios, displays
them in a table, and allows users to place orders while updating stock
dynamically."

### API Documentation Prompt

"Generate Swagger OpenAPI documentation for an Express.js REST API
containing product and order endpoints."

------------------------------------------------------------------------

# Manual Debugging Scenarios

During development several issues were manually diagnosed and resolved.


1 -- 404 API Error

Problem: React application returned 404 when requesting orders.

Resolution: Confirmed route registration in server.js:

    app.use("/api/orders", orderRoutes);

------------------------------------------------------------------------

2 -- Stock Not Updating

Problem: Stock quantity did not update after placing an order.

Resolution: Ensured transaction logic executed update before commit and
refreshed product list on frontend.

------------------------------------------------------------------------


# Bonus Features Implemented

✔ Database indexing for performance\
✔ Swagger OpenAPI documentation\
✔ Transaction-safe order placement\
✔ Clean REST API structure

------------------------------------------------------------------------

# Developer

Mohit Patil

------------------------------------------------------------------------
