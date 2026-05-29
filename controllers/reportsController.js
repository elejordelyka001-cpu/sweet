const db = require('../config/db');

exports.getReports = (req, res) => {
  const dailySalesQuery = `
    SELECT DATE(created_at) as date, SUM(total_amount) as total 
    FROM orders 
    WHERE status = 'Delivered' 
    GROUP BY DATE(created_at) 
    ORDER BY date ASC 
    LIMIT 30
  `;
  
  const monthlySalesQuery = `
    SELECT DATE_FORMAT(created_at, '%Y-%m') as month, SUM(total_amount) as total 
    FROM orders 
    WHERE status = 'Delivered' 
    GROUP BY DATE_FORMAT(created_at, '%Y-%m') 
    ORDER BY month ASC
  `;
  
  const bestSellingQuery = `
    SELECT p.cake_name, SUM(oi.quantity) as total_quantity 
    FROM order_items oi 
    JOIN products p ON oi.product_id = p.id 
    JOIN orders o ON oi.order_id = o.id 
    WHERE o.status = 'Delivered' 
    GROUP BY p.id 
    ORDER BY total_quantity DESC 
    LIMIT 10
  `;
  
  const inventoryQuery = 'SELECT * FROM inventory';
  
  db.query(dailySalesQuery, (err, dailySales) => {
    if (err) dailySales = [];
    db.query(monthlySalesQuery, (err, monthlySales) => {
      if (err) monthlySales = [];
      db.query(bestSellingQuery, (err, bestSelling) => {
        if (err) bestSelling = [];
        db.query(inventoryQuery, (err, inventory) => {
          if (err) inventory = [];
          res.render('reports', { 
            dailySales, 
            monthlySales, 
            bestSelling, 
            inventory, 
            user: req.session.user 
          });
        });
      });
    });
  });
};
