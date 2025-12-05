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


##SnapShots

<img width="1910" height="945" alt="Screenshot 2025-12-05 124513" src="https://github.com/user-attachments/assets/95033b6b-c277-4460-981d-19bd94129524" />

<img width="1912" height="855" alt="Screenshot 2025-12-05 124651" src="https://github.com/user-attachments/assets/bf3d9a02-b72e-43ba-b64d-39376277da33" />

<img width="1913" height="876" alt="Screenshot 2025-12-05 124715" src="https://github.com/user-attachments/assets/ac92aa35-9a35-4e59-9fff-727d66487588" />


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



