const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// // Sample user data for demonstration (in a real application, you should use a database)
// const users = [
//   { username: 'john_doe', password: 'password123' },
//   { username: 'jane_doe', password: 'securepassword' }
// ];

// app.use(bodyParser.json());

// Check if username exists
app.get('/check-username', (req, res) => {
  const { username } = req.query;

  // Check if the username exists in the sample data
  const userExists = users.some(user => user.username === username);

  if (userExists) {
    return res.json({ exists: true });
  } else {
    return res.json({ exists: false });
  }
});

// Reset password
app.post('/reset-password', (req, res) => {
  const { username, newPassword } = req.body;

  // Find the user and update the password
  const user = users.find(user => user.username === username);
  if (user) {
    user.password = newPassword;
    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
});

// Login endpoint (for username and password verification)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user and check if the password matches
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    return res.json({ success: true, user: { username: user.username } });
  } else {
    return res.json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
