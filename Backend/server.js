const express = require("express");
const db = require("./DB/db.js");
const customerRoutes = require("./Routes/customerRoutes.js");
const orderRoutes = require("./Routes/orderRoutes.js");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

// Routes
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Hello Welcome");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on the address http://localhost:${PORT}`);
});
