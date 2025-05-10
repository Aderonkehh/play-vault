// Project: PlayVault Backend (Node.js + Express + MySQL)

const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'frontend')));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sruthi',
    database: 'playvault'
});

db.connect(err => {
    if (err) {
        console.error('DB connection error:', err);
        process.exit(1);
    }
    console.log('MySQL connected.');
});

// Routes

// Register
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
        if (err) return res.status(500).send('Error registering user');
        res.send('User registered successfully');
    });
});

// Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err || results.length === 0) return res.status(401).send('Invalid credentials');
        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).send('Invalid credentials');
        req.session.user = user;
        res.send('Logged in successfully');
    });
});

// Logout
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logged out');
});

// Forgot Password
app.post('/forgot-password', (req, res) => {
    const { username, newPassword } = req.body;
    bcrypt.hash(newPassword, 10, (err, hash) => {
        if (err) return res.status(500).send('Error hashing new password');
        db.query('UPDATE users SET password = ? WHERE username = ?', [hash, username], (err) => {
            if (err) return res.status(500).send('Error updating password');
            res.send('Password updated');
        });
    });
});

// Delete Account
app.delete('/delete-account', (req, res) => {
    if (!req.session.user) return res.status(401).send('Unauthorized');
    db.query('DELETE FROM users WHERE id = ?', [req.session.user.id], (err) => {
        if (err) return res.status(500).send('Error deleting account');
        req.session.destroy();
        res.send('Account deleted');
    });
});

// Scoreboard
app.get('/scoreboard', (req, res) => {
    db.query('SELECT username, score FROM game_scores ORDER BY score DESC', (err, results) => {
        if (err) return res.status(500).send('Error fetching scores');
        res.json(results);
    });
});

// User Statistics
app.get('/user-stats', (req, res) => {
    if (!req.session.user) return res.status(401).send('Unauthorized');
    db.query('SELECT * FROM game_scores WHERE user_id = ?', [req.session.user.id], (err, results) => {
        if (err) return res.status(500).send('Error fetching stats');
        res.json(results);
    });
});

// Catch-all route to serve frontend (for SPA routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
