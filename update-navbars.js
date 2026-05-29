const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');
const ejsFiles = fs.readdirSync(viewsDir).filter(f => f.endsWith('.ejs'));

ejsFiles.forEach(file => {
  const filePath = path.join(viewsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace navbar structure (move user/logout to main nav)
  content = content.replace(
    /        <\/ul>\s*        <ul class="navbar-nav">\s*          <li class="nav-item"><span class="nav-link text-white">👋 <%= user.name %><\/span><\/li>\s*          <li class="nav-item"><a class="nav-link" href="\/logout">Logout<\/a><\/li>\s*        <\/ul>/g,
    '          <li class="nav-item"><span class="nav-link text-white">👋 <%= user.name %></span></li>\n          <li class="nav-item"><a class="nav-link" href="/logout">Logout</a></li>'
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated navbar in ${file}`);
});

console.log('All navbars updated!');
