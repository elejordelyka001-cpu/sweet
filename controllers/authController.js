const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
  res.render('login', { error: null });
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;
  
  User.findByEmail(email, (err, results) => {
    if (err) {
      return res.render('login', { error: 'Database error' });
    }
    if (results.length === 0) {
      return res.render('login', { error: 'Invalid email or password' });
    }
    
    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (err || !match) {
        return res.render('login', { error: 'Invalid email or password' });
      }
      req.session.user = user;
      if (user.role === 'admin') {
        res.redirect('/admin/dashboard');
      } else if (user.role === 'staff') {
        res.redirect('/staff/dashboard');
      } else {
        res.redirect('/customer/dashboard');
      }
    });
  });
};

exports.getRegister = (req, res) => {
  res.render('register', { error: null });
};

exports.postRegister = (req, res) => {
  const { name, email, password } = req.body;
  
  User.findByEmail(email, (err, results) => {
    if (err) {
      return res.render('register', { error: 'Database error' });
    }
    if (results.length > 0) {
      return res.render('register', { error: 'Email already exists' });
    }
    
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.render('register', { error: 'Error hashing password' });
      }
      
      User.create({ name, email, password: hashedPassword, role: 'customer' }, (err) => {
        if (err) {
          return res.render('register', { error: 'Error creating user' });
        }
        res.redirect('/login');
      });
    });
  });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};
