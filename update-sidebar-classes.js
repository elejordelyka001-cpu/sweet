const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');

// Admin files
const adminFiles = ['adminDashboard.ejs', 'products.ejs', 'orders.ejs', 'inventory.ejs', 'payments.ejs', 'reports.ejs', 'addProduct.ejs', 'editProduct.ejs', 'addInventory.ejs', 'editInventory.ejs'];
// Staff files
const staffFiles = ['staffDashboard.ejs'];
// Customer files
const customerFiles = ['customerDashboard.ejs', 'customerOrders.ejs', 'checkout.ejs'];
// Order detail (shared, will handle conditionally)
const sharedFiles = ['orderDetail.ejs'];

adminFiles.forEach(file => {
  const filePath = path.join(viewsDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/<div class="sidebar">/g, '<div class="sidebar sidebar-admin">');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Added sidebar-admin to ${file}`);
  }
});

staffFiles.forEach(file => {
  const filePath = path.join(viewsDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/<div class="sidebar">/g, '<div class="sidebar sidebar-staff">');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Added sidebar-staff to ${file}`);
  }
});

customerFiles.forEach(file => {
  const filePath = path.join(viewsDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/<div class="sidebar">/g, '<div class="sidebar sidebar-customer">');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Added sidebar-customer to ${file}`);
  }
});

sharedFiles.forEach(file => {
  const filePath = path.join(viewsDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/<% if \(user\.role === 'admin'\) { %>\s*<div class="sidebar">/g, '<% if (user.role === \'admin\') { %>\n  <div class="sidebar sidebar-admin">');
    content = content.replace(/<% } else if \(user\.role === 'staff'\) { %>\s*<div class="sidebar">/g, '<% } else if (user.role === \'staff\') { %>\n  <div class="sidebar sidebar-staff">');
    content = content.replace(/<% } else if \(user\.role === 'customer'\) { %>\s*<div class="sidebar">/g, '<% } else if (user.role === \'customer\') { %>\n  <div class="sidebar sidebar-customer">');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated sidebar classes in ${file}`);
  }
});

console.log('All sidebar class updates complete!');
