const express = require("express");
const db = require("../DB/db.js");

const router = express.Router();
// POST /api/customers - Add customer
router.post("/", (req, res) => {
  const { name, phone, address,email } = req.body;

  if (!name || !phone || !address ||!email) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const sql = "INSERT INTO customers (name, phone, address,email) VALUES (?, ?, ?,?)";
  db.query(sql, [name, phone, address, email || ""], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Database error", error: err });
    }

    return res.json({
      success: true,
      message: "Customer added successfully...",
      data: {
        id: result.insertId,
        name,
        phone,
        address,
        email,
      },
    });
  });
});

// GET /api/customers - List customers
router.get("/", (req, res) => {
  const sql = "SELECT * FROM customers ORDER BY id DESC";

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

module.exports = router;
