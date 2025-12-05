import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../api";
import Common from "./Common";

import "./CustomersPage.css";

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    email:"",
  });
  const [message, setMessage] = useState("");

  const loadCustomers = async () => {
    try {
      setMessage(""); 
      const res = await axios.get(`${API}/customers`);
      console.log("GET /customers:", res.data);

    
      const data = res.data?.data;
      setCustomers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading customers:", err);
      setMessage("Failed to load customers.");
    
      setCustomers([]);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleAddClick = () => {
    setShowForm((prev) => !prev);
    setMessage("");
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.name || !form.phone || !form.address) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const res = await axios.post(`${API}/customers`, form);
      console.log("POST /customers:", res.data);

      setMessage(res.data.message || "Customer added successfully");
      setForm({ name: "", phone: "", address: "" ,email:""});
      setShowForm(false);
      loadCustomers();
    } catch (err) {
      console.error("Error adding customer:", err);
      setMessage(
        err.response?.data?.message ||
          "Something went wrong while adding customer."
      );
    }
  };

  return (
    <>
      <Common />

      <div className="customers-container">
        <div className="customers-header">
          <h1 className="customers-title">List of Customers</h1>
          <button className="add-button" onClick={handleAddClick}>
            {showForm ? "Close" : "Add"}
          </button>
        </div>

        {showForm && (
          <form className="customer-form" onSubmit={handleSubmit}>
            <h3>Add New Customer</h3>

            {message && <p className="form-message">{message}</p>}

            <input
              type="text"
              name="name"
              placeholder="Customer Name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Mobile Number"
              value={form.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={form.email}
              onChange={handleChange}
            />

            <button type="submit" className="submit-button">
              Save Customer
            </button>
          </form>
        )}

        {!showForm && message && <p className="form-message">{message}</p>}

        {!customers || customers.length === 0 ? (
          <p>No customers found.</p>
        ) : (
          customers.map((c, index) => (
            <div key={c.id} className="customer-card">
              <div className="customer-name">
                {index + 1}. {c.name}
              </div>
              <div className="customer-info">
                <strong>Phone:</strong> {c.phone}
              </div>
              <div className="customer-info">
                <strong>Email:</strong> {c.email}
              </div>
              <div className="customer-info">
                <strong>Address:</strong> {c.address}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default CustomersPage;
