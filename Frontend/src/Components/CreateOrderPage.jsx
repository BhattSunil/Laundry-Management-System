import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../api";
import Common from "./Common";

import "./CreateOrderPage.css";

function CreateOrderPage() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    customer_id: "",
    service_name: "",
    quantity: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load customers for dropdown
  const loadCustomers = async () => {
    try {
      const res = await axios.get(`${API}/customers`);
      setCustomers(res.data.data);
    } catch (err) {
      console.error("Error loading customers:", err);
      setError("Failed to load customers.");
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!form.customer_id || !form.service_name || !form.quantity) {
      setError("All fields are required.");
      return;
    }

    if (Number(form.quantity) <= 0) {
      setError("Quantity must be greater than 0.");
      return;
    }

    try {
      const res = await axios.post(`${API}/orders`, {
        customer_id: form.customer_id,
        service_name: form.service_name,
        quantity: Number(form.quantity),
      });

      setMessage(res.data.message || "Order created successfully.");
      setForm({ customer_id: "", service_name: "", quantity: "" });
    } catch (err) {
      console.error("Error creating order:", err);
      setError(
        err.response?.data?.message ||
          "Something went wrong while creating order."
      );
    }
  };

  return (
    <>
      <Common />

      <div className="order-container">
        <h1 className="order-title">Create New Order</h1>

        {error && <p className="order-error">{error}</p>}
        {message && <p className="order-success">{message}</p>}

        <form className="order-form" onSubmit={handleSubmit}>
          <label>Select Customer</label>
          <select
            name="customer_id"
            value={form.customer_id}
            onChange={handleChange}
          >
            <option value="">-- Select Customer --</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.phone})
              </option>
            ))}
          </select>

          <label>Service Name</label>
          <input
            type="text"
            name="service_name"
            placeholder="e.g. Wash & Iron, Dry Clean"
            value={form.service_name}
            onChange={handleChange}
          />

          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            placeholder="e.g. 3"
            value={form.quantity}
            onChange={handleChange}
          />

          <button type="submit" className="order-submit-button">
            Create Order
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateOrderPage;
