# 🧺 Laundry Management System

A full-stack Laundry Management System built with **React** (Frontend) and **Node.js + Express + MySQL** (Backend).  
This project manages customers and their laundry orders, including service details, quantities, and order status tracking.

> Repository: [Laundry-Management-System](https://github.com/BhattSunil/Laundry-Management-System)

---

## ✨ Features

### 👤 Customer Management
- Add new customers with basic details (name, phone, address, email).
- View list of all customers.

### 🧾 Order Management
- Create laundry orders linked to a customer.
- Store service name, quantity, and status (e.g. **Pending**, **In Progress**, **Completed**).
- View all orders with **customer name** using SQL joins.
- Update order status as work progresses.

### 💻 Tech Stack

**Frontend**
- React
- Axios for API calls
- Modern, responsive UI with custom CSS

**Backend**
- Node.js
- Express.js
- MySQL database
- RESTful API structure
- CORS enabled for frontend ↔ backend communication

**Database**
- `customers` table (stores customer details)
- `orders` table (stores order info linked via `customer_id` foreign key)

---

## 📁 Project Structure

```bash
Laundry-Management-System/
├── Backend/
│   ├── DB/
│   │   └── db.js          # MySQL connection
│   ├── Routes/
│   │   ├── customerRoutes.js
│   │   └── orderRoutes.js
│   ├── .env.example       # Example environment variables (if present)
│   ├── package.json
│   └── index.js / server.js
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CustomersPage.jsx
│   │   │   └── OrdersPage.jsx
│   │   │     
│   │   ├── api.js         # API base URL config (if present)
│   │   └── ...
│   ├── package.json
│   └── ...
│
└── .gitignore

##SnapShots

<img width="1910" height="945" alt="image" src="https://github.com/user-attachments/assets/361092d4-59a8-4ad1-9807-7c195ac36fda" />
<img width="1912" height="855" alt="image" src="https://github.com/user-attachments/assets/9ae3d652-1adc-41d3-af01-a615098debe0" />
<img width="1913" height="876" alt="image" src="https://github.com/user-attachments/assets/d34fe8ec-4eb0-461a-94c8-e7d81d0549ab" />

