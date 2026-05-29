const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');
const adminPages = ['orders.ejs', 'inventory.ejs', 'payments.ejs', 'reports.ejs', 'addProduct.ejs', 'editProduct.ejs', 'addInventory.ejs', 'editInventory.ejs'];
const staffPages = ['staffDashboard.ejs'];

function updateAdminPage(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace navbar with sidebar
  content = content.replace(
    /<nav[\s\S]*?<\/nav>/,
    `  <div class="sidebar">
    <div class="sidebar-brand">
      🎂 SweetBake Admin
    </div>
    <ul class="sidebar-menu">
      <li class="sidebar-item">
        <a href="/admin/dashboard" class="sidebar-link">Dashboard</a>
      </li>
      <li class="sidebar-item">
        <a href="/admin/products" class="sidebar-link">Products</a>
      </li>
      <li class="sidebar-item">
        <a href="/admin/orders" class="sidebar-link">Orders</a>
      </li>
      <li class="sidebar-item">
        <a href="/admin/inventory" class="sidebar-link">Inventory</a>
      </li>
      <li class="sidebar-item">
        <a href="/admin/payments" class="sidebar-link">Payments</a>
      </li>
      <li class="sidebar-item">
        <a href="/admin/reports" class="sidebar-link">Reports</a>
      </li>
      <li class="sidebar-item">
        <span class="sidebar-link">👋 <%= user.name %></span>
      </li>
      <li class="sidebar-item">
        <a href="/logout" class="sidebar-link">Logout</a>
      </li>
    </ul>
  </div>

  <div class="main-content">`
  );
  
  // Replace container mt-5 closing div with main-content closing div
  content = content.replace(/<div class="container mt-5">/, '');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated sidebar in ${path.basename(filePath)}`);
}

function updateStaffPage(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace navbar with sidebar
  content = content.replace(
    /<nav[\s\S]*?<\/nav>/,
    `  <div class="sidebar">
    <div class="sidebar-brand">
      🍰 SweetBake Staff
    </div>
    <ul class="sidebar-menu">
      <li class="sidebar-item">
        <a href="/staff/dashboard" class="sidebar-link">Dashboard</a>
      </li>
      <li class="sidebar-item">
        <a href="/staff/orders" class="sidebar-link">Orders</a>
      </li>
      <li class="sidebar-item">
        <a href="/staff/inventory" class="sidebar-link">Inventory</a>
      </li>
      <li class="sidebar-item">
        <a href="/staff/payments" class="sidebar-link">Payments</a>
      </li>
      <li class="sidebar-item">
        <span class="sidebar-link">👋 <%= user.name %></span>
      </li>
      <li class="sidebar-item">
        <a href="/logout" class="sidebar-link">Logout</a>
      </li>
    </ul>
  </div>

  <div class="main-content">`
  );
  
  // Replace container mt-5 closing div with main-content closing div
  content = content.replace(/<div class="container mt-5">/, '');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated sidebar in ${path.basename(filePath)}`);
}

// Update admin pages
adminPages.forEach(page => {
  const filePath = path.join(viewsDir, page);
  if (fs.existsSync(filePath)) {
    updateAdminPage(filePath);
  }
});

// Update staff pages
staffPages.forEach(page => {
  const filePath = path.join(viewsDir, page);
  if (fs.existsSync(filePath)) {
    updateStaffPage(filePath);
  }
});

console.log('All sidebar updates completed!');
