const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.getProducts = (req, res) => {
  Product.findAll((err, products) => {
    if (err) {
      return res.status(500).send('Error fetching products');
    }
    res.render('products', { products, user: req.session.user });
  });
};

exports.getAddProduct = (req, res) => {
  res.render('addProduct', { user: req.session.user });
};

exports.postAddProduct = [upload.single('image'), (req, res) => {
  const { cake_name, description, price } = req.body;
  const image = req.file ? req.file.filename : null;
  
  Product.create({ cake_name, description, price, image }, (err) => {
    if (err) {
      return res.status(500).send('Error adding product');
    }
    res.redirect('/admin/products');
  });
}];

exports.getEditProduct = (req, res) => {
  Product.findById(req.params.id, (err, products) => {
    if (err || products.length === 0) {
      return res.status(500).send('Error fetching product');
    }
    res.render('editProduct', { product: products[0], user: req.session.user });
  });
};

exports.postEditProduct = [upload.single('image'), (req, res) => {
  const { cake_name, description, price } = req.body;
  const image = req.file ? req.file.filename : req.body.existingImage;
  
  Product.update(req.params.id, { cake_name, description, price, image }, (err) => {
    if (err) {
      return res.status(500).send('Error updating product');
    }
    res.redirect('/admin/products');
  });
}];

exports.deleteProduct = (req, res) => {
  Product.delete(req.params.id, (err) => {
    if (err) {
      return res.status(500).send('Error deleting product');
    }
    res.redirect('/admin/products');
  });
};
