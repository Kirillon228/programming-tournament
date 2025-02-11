// db.js
const sqlite3 = require('sqlite3').verbose();

// Connect to (or create) the SQLite database file
const db = new sqlite3.Database('./data.db', (err) => {
  if (err) {
    return console.error('Error opening database:', err.message);
  }
  console.log('Connected to the SQLite database.');

  // Create the "users" table if it doesn't exist
  db.run(`CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT
        )`, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      // Check if the table is empty and insert sample data if needed
      db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
          console.error('Error querying table:', err.message);
        } else if (rows.length === 0) {
          const insert = 'INSERT INTO users (name, email) VALUES (?, ?)';
          db.run(insert, ['Алексей Филатов', 'alex@example.com']);
          db.run(insert, ['Арина Филатова', 'arina@example.com']);
          db.run(insert, ['Кирилл Кириченко', 'kirill@example.com']);
          console.log('Inserted sample data into users table.');
        }
      });
    }
  });
});

module.exports = db;
