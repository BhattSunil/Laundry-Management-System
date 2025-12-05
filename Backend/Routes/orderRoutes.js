const express = require("express");
const db = require("../DB/db.js");

const router = express.Router();

// POST /api/orders - Create order
router.post("/", (req, res) => {
  const { customer_id, service_name, quantity } = req.body;

  if (!customer_id || !service_name || !quantity) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  if (quantity <= 0) {
    return res
      .status(400)
      .json({ success: false, message: "Quantity must be greater than 0" });
  }

  const sql =
    "INSERT INTO orders (customer_id, service_name, quantity) VALUES (?, ?, ?)";
  db.query(sql, [customer_id, service_name, quantity], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Database error", error: err });
    }

    return res.json({
      success: true,
      message: "Order created successfully",
      data: {
        id: result.insertId,
        customer_id,
        service_name,
        quantity,
        status: "Received",
      },
    });
  });
});

// GET /api/orders - List all orders with customer name
router.get("/", (req, res) => {
  const sql = `
    SELECT o.id, o.service_name, o.quantity, o.status, o.created_at,
           c.name AS customer_name
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    ORDER BY o.id DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Database error", error: err });
    }

    return res.json({ success: true, data: rows });
  });
});

// PUT /api/orders/:id/status - Update order status
router.put("/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res
      .status(400)
      .json({ success: false, message: "Status is required" });
  }

  const sql = "UPDATE orders SET status = ? WHERE id = ?";
  db.query(sql, [status, id], (err) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Database error", error: err });
    }

    return res.json({
      success: true,
      message: "Order status updated successfully",
    });
  });
});

module.exports = router;
