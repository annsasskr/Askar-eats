const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// SQLite Database setup
const db = new sqlite3.Database(':memory:'); // Use a file (e.g., 'db.sqlite') for persistence

db.serialize(() => {
  db.run(`
    CREATE TABLE restaurants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      menu TEXT
    )
  `);
  
  db.run(`
    CREATE TABLE orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      restaurant_id INTEGER,
      items TEXT,
      status TEXT DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Sample data
  db.run(`
    INSERT INTO restaurants (name, menu)
    VALUES ('Pizzeria Bella', '[{"name":"Margherita","price":8},{"name":"Hawaii","price":10}]')
  `);
});

// API Routes
app.get('/restaurants', (req, res) => {
  db.all('SELECT * FROM restaurants', (err, rows) => {
    res.json(rows);
  });
});

app.post('/orders', (req, res) => {
  const { restaurant_id, items } = req.body;
  db.run(
    'INSERT INTO orders (restaurant_id, items) VALUES (?, ?)',
    [restaurant_id, JSON.stringify(items)],
    function(err) {
      res.json({ id: this.lastID });
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));