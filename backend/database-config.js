import mysql from "mysql";
import { app } from "../main.js";
import bcrypt from "bcryptjs";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "221122",
  database: "login_page"
});

app.post('/api/users/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  // Find user by username or email
  db.query("SELECT * FROM users WHERE username = ? OR email = ?", [username, username], async (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid username or password" });
    }

    const user = results[0];

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid username or password" });
    }

    res.json({ success: true, message: "Login successful", user });
  });
});

// Register Route
app.post('/api/users/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // Check if the email already exists
    db.query("SELECT * FROM users WHERE username = ? OR email = ?", [username, email], async (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Database error" });
      }
      if (results.length > 0) {
        return res.status(400).json({ success: false, message: "Username or email already taken" });
}

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into the database
      db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
        [username, email, hashedPassword], 
        (err, result) => {
          if (err) {
            return res.status(500).json({ success: false, message: "Database error" });
          }
          res.status(201).json({ success: true, message: "User registered successfully" });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default db;
