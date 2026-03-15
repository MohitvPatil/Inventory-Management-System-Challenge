// const express = require("express");
// const cors = require("cors");

// const productRoutes = require("./routes/productRoutes");
// const orderRoutes = require("./routes/orderRoutes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });

const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});