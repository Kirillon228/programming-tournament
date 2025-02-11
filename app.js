// app.js
const express = require('express');
const path = require('path');

// Import the database from db.js
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS as the view engine and specify the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Home page route
app.get('/home', (req, res) => {
  res.render('home', { title: 'Home' });
});

// About page route
app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

// Contact page route
app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

  //Calendar page route
  app.get('/calendar', (req, res) => {
   res.render('calendar', { title: 'Calendar' });
});

// Data page route: Retrieve and display data from SQLite in a table
app.get('/data', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      res.status(500).send('Database error');
    } else {
      res.render('data', { title: 'User Data', users: rows });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

