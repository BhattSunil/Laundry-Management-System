import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../api";
import Common from "./Common";
import "./OrdersPage.css";

const STATUS_OPTIONS = ["Received", "In Progress", "Completed", "Delivered"];

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      const res = await axios.get(`${API}/orders`);
      setOrders(res.data.data);
    } catch (err) {
      console.error("Error loading orders:", err);
      setError("Failed to load orders.");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setMessage("");
    setError("");

    try {
      const res = await axios.put(`${API}/orders/${id}/status`, {
        status: newStatus,
      });
      setMessage(res.data.message || "Order status updated.");
      loadOrders(); // refresh list
    } catch (err) {
      console.error("Error updating status:", err);
      setError(
        err.response?.data?.message ||
          "Something went wrong while updating order status."
      );
    }
  };

  return (
    <>
      <Common />

      <div className="orders-container">
        <h1 className="orders-title">Orders</h1>

        {error && <p className="orders-error">{error}</p>}
        {message && <p className="orders-success">{message}</p>}

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((o, index) => (
            <div key={o.id} className="order-card">
              <div className="order-header">
                <div className="order-main">
                  <div className="order-title-text">
                    {index + 1}. {o.service_name}
                  </div>
                  <div className="order-customer">
                    <strong>Customer:</strong> {o.customer_name}
                  </div>
                </div>

                <div className="order-status-block">
                  <span className="order-status-label">Status:</span>
                  <select
                    value={o.status}
                    onChange={(e) => handleStatusChange(o.id, e.target.value)}
                    className="order-status-select"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="order-info">
                <span>
                  <strong>Quantity:</strong> {o.quantity}
                </span>
                <span>
                  <strong>Date:</strong>{" "}
                  {new Date(o.created_at).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default OrdersPage;
