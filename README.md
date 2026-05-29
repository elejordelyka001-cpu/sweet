# SweetBake - Cake Shop Management System

A full-stack web application for managing a cake shop, built with Node.js, Express, EJS, and MySQL.

## Features

- **Authentication**: Role-based access control (Admin, Staff, Customer)
- **Product Management**: Add, edit, delete cake products with images
- **Order Management**: Shopping cart, checkout, order tracking, status updates
- **Inventory Management**: Ingredient tracking with low stock alerts
- **Payment Processing**: GCash and Cash on Delivery options, payment proof upload
- **Reports**: Daily/monthly sales, best-selling cakes, inventory reports

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Copy the `.env` file and update the values with your Aiven MySQL database credentials:
   ```
   DB_HOST=your-aiven-host
   DB_PORT=your-port
   DB_USER=your-username
   DB_PASSWORD=your-password
   DB_NAME=sweetbake
   SESSION_SECRET=sweetbake_secret
   ```

3. **Set up the database**:
   Execute the `schema.sql` file in your MySQL database to create the necessary tables.

4. **Start the server**:
   ```bash
   npm start
   ```

5. **Access the application**:
   Open your browser and go to `http://localhost:3000`

## Usage

- **Admin**: Manage products, inventory, staff, view all orders and reports
- **Staff**: Process orders, update order status, manage inventory, confirm payments
- **Customer**: Register/login, browse products, add to cart, checkout, track orders

## Technologies Used

- Frontend: HTML, CSS, Bootstrap, EJS
- Backend: Node.js, Express.js
- Database: MySQL (Aiven)
- Other: bcrypt (password hashing), express-session (session management), multer (file uploads)
