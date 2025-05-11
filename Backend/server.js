// Backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const sql = require('./db'); 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});


// POST route to register a student---------------------------------------------------------------------------------------
app.post('/register', (req, res) => {
  const { username, password, confirmpassword } = req.body;

  if (password !== confirmpassword) {
    return res.status(400).json({ message: 'Password not Matching !!' });
  }

  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
  sql.query(query, [username, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'User already exists or DB error.' });
    }

    res.json({ message: 'Student successfully registered!' });
  });
});


// For login Post-------------------------------------------------------------------------------------------------
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Missing credentials" });
  }

  const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
  sql.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Database error during login:", err);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }

    if (results.length > 0) {
      const user = results[0];
      res.json({ success: true, user: { id: user.id, username: user.username } });
    } else {
      res.status(401).json({ success: false, message: "Invalid username or password" });
    }
  });
});

//Forgot password validate username exist in db
app.post('/check-username', (req, res) => {
  const { username } = req.body;
  const query = `SELECT * FROM users WHERE username = ?`;

  sql.query(query, [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Username not found' });
    }
  });
});

//then update the password for the entered username
app.post('/reset-password', (req, res) => {
  const { username, newPassword } = req.body;

  const query = `UPDATE users SET password = ? WHERE username = ?`;
  sql.query(query, [newPassword, username], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Failed to update password' });
    }

    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Password updated successfully' });
    } else {
      res.json({ success: false, message: 'User not found' });
    }
  });
});




//Listen to the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
