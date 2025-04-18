import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Aishwarya_21',   // your MySQL password
  database: 'halldb'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Fetch bookings
app.get('/api/customer', (req, res) => {
  const sql = 'SELECT * FROM customer ORDER BY event_date ASC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
