const fs = require('fs');
const path = require('path');

// Update EJS files
const viewsDir = path.join(__dirname, 'views');
const ejsFiles = fs.readdirSync(viewsDir).filter(f => f.endsWith('.ejs'));

ejsFiles.forEach(file => {
  const filePath = path.join(viewsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace $ with ₱, but be careful not to break variables
  content = content.replace(/\$([0-9]+)/g, '₱$1');
  content = content.replace(/\$/g, '₱');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated currency in ${file}`);
});

console.log('Currency updated to Piso (₱)!');
