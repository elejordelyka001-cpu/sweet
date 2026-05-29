require('dotenv').config();
const db = require('./config/db');
const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

// Split schema into individual queries to avoid issues with multiple statements
const queries = schema.split(';').filter(q => q.trim());

queries.forEach((query, index) => {
  if (query.trim()) {
    db.query(query, (err, result) => {
      if (err) {
        console.error(`Error executing query ${index + 1}:`, err.message);
      } else {
        console.log(`Query ${index + 1} executed successfully`);
      }
    });
  }
});

// Close connection after a short delay
setTimeout(() => {
  db.end();
  console.log('Database initialization complete!');
}, 3000);
