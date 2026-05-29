const Order = require('../models/Order');
const Product = require('../models/Product');
const Payment = require('../models/Payment');
const User = require('../models/User');

exports.getOrders = (req, res) => {
  Order.findAll((err, orders) => {
    if (err) {
      return res.status(500).send('Error fetching orders');
    }
    res.render('orders', { orders, user: req.session.user });
  });
};

exports.getAddOrder = (req, res) => {
  User.findAll((err, users) => {
    if (err) {
      return res.status(500).send('Error fetching users');
    }
    const customers = users.filter(u => u.role === 'customer');
    res.render('addOrder', { user: req.session.user, customers });
  });
};

exports.postAddOrder = async (req, res) => {
  const { customerOption, customer_id, newCustomerName, total_amount, payment_method } = req.body;
  
  try {
    let finalCustomerId;
    
    if (customerOption === 'new' && newCustomerName) {
      // Generate random email and password
      const randomEmail = `${newCustomerName.toLowerCase().replace(/\s+/g, '')}${Date.now()}@sweetbake.com`;
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await require('bcrypt').hash(randomPassword, 10);
      
      // Create new customer
      const newCustomerResult = await new Promise((resolve, reject) => {
        User.create({
          name: newCustomerName,
          email: randomEmail,
          password: hashedPassword,
          role: 'customer'
        }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
      
      finalCustomerId = newCustomerResult.insertId;
    } else {
      finalCustomerId = customer_id;
    }
    
    // Create order
    Order.create({ customer_id: finalCustomerId, total_amount }, (err, result) => {
      if (err) {
        return res.status(500).send('Error adding order');
      }
      
      const orderId = result.insertId;
      
      Payment.create({ order_id: orderId, payment_method }, (err) => {
        if (err) {
          return res.status(500).send('Error adding payment');
        }
        
        if (req.session.user.role === 'admin') {
          res.redirect('/admin/orders');
        } else {
          res.redirect('/staff/orders');
        }
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing order');
  }
};

exports.getCustomerOrders = (req, res) => {
  Order.findByCustomerId(req.session.user.id, (err, orders) => {
    if (err) {
      return res.status(500).send('Error fetching orders');
    }
    res.render('customerOrders', { orders, user: req.session.user });
  });
};

exports.getOrderDetail = (req, res) => {
  Order.findById(req.params.id, (err, orders) => {
    if (err || orders.length === 0) {
      return res.status(500).send('Error fetching order');
    }
    Order.getOrderItems(req.params.id, (err, items) => {
      if (err) {
        return res.status(500).send('Error fetching order items');
      }
      Payment.findByOrderId(req.params.id, (err, payments) => {
        res.render('orderDetail', { 
          order: orders[0], 
          items, 
          payment: payments[0] || null,
          user: req.session.user 
        });
      });
    });
  });
};

exports.updateOrderStatus = (req, res) => {
  Order.updateStatus(req.params.id, req.body.status, (err) => {
    if (err) {
      return res.status(500).send('Error updating order status');
    }
    res.redirect('/staff/orders');
  });
};

exports.getCheckout = (req, res) => {
  Product.findAll((err, products) => {
    if (err) {
      return res.status(500).send('Error fetching products');
    }
    res.render('checkout', { products, user: req.session.user, cart: req.session.cart || [] });
  });
};

exports.postCheckout = (req, res) => {
  const { payment_method } = req.body;
  const cart = req.session.cart || [];
  
  if (cart.length === 0) {
    return res.redirect('/customer/dashboard');
  }
  
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  });
  
  Order.create({ customer_id: req.session.user.id, total_amount: total }, (err, result) => {
    if (err) {
      return res.status(500).send('Error creating order');
    }
    const orderId = result.insertId;
    
    cart.forEach(item => {
      Order.addOrderItem({ order_id: orderId, product_id: item.id, quantity: item.quantity, price: item.price }, () => {});
    });
    
    Payment.create({ order_id: orderId, payment_method }, (err) => {
      req.session.cart = [];
      res.redirect('/customer/orders');
    });
  });
};

exports.addToCart = (req, res) => {
  const { product_id, quantity } = req.body;
  Product.findById(product_id, (err, products) => {
    if (err || products.length === 0) {
      return res.status(500).send('Error fetching product');
    }
    const product = products[0];
    if (!req.session.cart) {
      req.session.cart = [];
    }
    req.session.cart.push({
      id: product.id,
      cake_name: product.cake_name,
      price: product.price,
      quantity: parseInt(quantity)
    });
    res.redirect('/customer/dashboard');
  });
};
