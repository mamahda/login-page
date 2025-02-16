import { app } from "../main.js";
import db from "./database-config.js";
import bcrypt from "bcryptjs";

export default function apiLogin() {
  app.post('/api/users/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    db.query("SELECT * FROM users WHERE username = ? OR email = ?", [username, username], async (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Database error" });
      }
      if (results.length === 0) {
        return res.status(400).json({ success: false, message: "Invalid username or password" });
      }

      const user = results[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid username or password" });
      }

      res.json({ success: true, message: "Login successful", user: { id: user.id, username: user.username, email: user.email } });
    });
  });
}

