const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Mohit@2808",
  database: "inventory_db",
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;