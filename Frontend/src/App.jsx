import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import CustomersPage from "./Components/CustomersPage";
import CreateOrderPage from "./Components/CreateOrderPage";
import OrdersPage from "./Components/OrdersPage";

import "./App.css";

function App() {
  return (
    <div>
      <header className="app-header">
        <h2 className="app-title">Laundry Management System</h2>

        <nav className="app-nav">
          <NavLink
            to="/customers"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Customers
          </NavLink>

          <NavLink
            to="/create-order"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Create Order
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Orders
          </NavLink>
        </nav>
      </header>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/customers" replace />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/create-order" element={<CreateOrderPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="*" element={<h3>Page not found</h3>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
