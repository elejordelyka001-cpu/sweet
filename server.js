require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reportsRoutes = require('./routes/reportsRoutes');
const Product = require('./models/Product');
const { isAuthenticated, isAdmin, isStaff, isCustomer } = require('./middleware/authMiddleware');

app.use('/', authRoutes);
app.use('/', productRoutes);
app.use('/', orderRoutes);
app.use('/', inventoryRoutes);
app.use('/', paymentRoutes);
app.use('/', reportsRoutes);

// Dashboard routes
app.get('/admin/dashboard', isAdmin, (req, res) => {
  res.render('adminDashboard', { user: req.session.user });
});

app.get('/staff/dashboard', isStaff, (req, res) => {
  res.render('staffDashboard', { user: req.session.user });
});

app.get('/customer/dashboard', isCustomer, (req, res) => {
  Product.findAll((err, products) => {
    if (err) products = [];
    res.render('customerDashboard', { user: req.session.user, products, cart: req.session.cart || [] });
  });
});

app.get('/', (req, res) => {
  if (req.session.user) {
    if (req.session.user.role === 'admin') {
      res.redirect('/admin/dashboard');
    } else if (req.session.user.role === 'staff') {
      res.redirect('/staff/dashboard');
    } else {
      res.redirect('/customer/dashboard');
    }
  } else {
    res.redirect('/login');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
