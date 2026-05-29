const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');
const files = fs.readdirSync(viewsDir).filter(f => f.endsWith('.ejs'));

files.forEach(file => {
  if (file === 'login.ejs' || file === 'register.ejs') return; // already updated
  
  const filePath = path.join(viewsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add custom CSS link after Bootstrap
  if (!content.includes('/css/style.css')) {
    content = content.replace(
      '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">',
      '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">\n  <link href="/css/style.css" rel="stylesheet">'
    );
  }
  
  // Add cake emoji to h1 if not already there
  if (content.includes('<h1') && !content.includes('cake-emoji')) {
    content = content.replace(/<h1([^>]*)>(.*?)<\/h1>/g, '<h1$1 class="cake-emoji">$2</h1>');
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});

console.log('All templates updated!');
