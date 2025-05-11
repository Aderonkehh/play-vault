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

  if (!username || !password || !confirmpassword) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  if (password !== confirmpassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match.' });
  }

  const checkQuery = 'SELECT * FROM users WHERE username = ?';
  sql.query(checkQuery, [username], (checkErr, results) => {
    if (checkErr) {
      console.error('Check error:', checkErr);
      return res.status(500).json({ success: false, message: 'Server error occurred.' });
    }

    if (results.length > 0) {
      // STOP further execution
      return res.status(409).json({ success: false, message: 'Username already exists.' });
    }

    // This only runs if username is not taken
    const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
    sql.query(insertQuery, [username, password], (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Insert error:', insertErr);
        return res.status(500).json({ success: false, message: 'Failed to register user.' });
      }

      return res.status(201).json({ success: true, message: 'User successfully registered!' });
    });
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

// For delete user account-------------------------------------------------------------------------------------------------
app.delete('/delete-account', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ success: false, message: 'Username is required.' });
  }

  const deleteQuery = 'DELETE FROM users WHERE username = ?';
  sql.query(deleteQuery, [username], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ success: false, message: 'Server error.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    return res.status(200).json({ success: true, message: 'Account deleted successfully.' });
  });
});

//Listen to the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
