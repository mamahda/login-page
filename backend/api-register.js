import { app } from "../main.js";
import db from "./database-config.js";
import bcrypt from "bcryptjs";

export default function apiRegister() {
  app.post('/api/users/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    db.query("SELECT * FROM users WHERE username = ? OR email = ?", [username, email], async (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Database error" });
      }
      if (results.length > 0) {
        return res.status(400).json({ success: false, message: "Username or email already taken" });
      }

      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
          [username, email, hashedPassword], 
          (err, result) => {
            if (err) {
              return res.status(500).json({ success: false, message: "Database error" });
            }
            res.status(201).json({ success: true, message: "User registered successfully" });
          }
        );
      } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
      }
    });
  });
}

