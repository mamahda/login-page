import { app } from "../main.js";
import db from "./database-config.js";
import bcrypt from "bcryptjs";

// function to login user 
export default function apiLogin() {
  // api for login user 
  app.post('/api/users/login/', async (req, res) => {
    const { username, password } = req.body;

    // check if username and password is empty
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // check if username or email is valid
    db.query("SELECT * FROM users WHERE username = ? OR email = ?", [username, username], async (err, results) => {
      // handle database error
      if (err) {
        return res.status(500).json({ success: false, message: "Database error" });
      }
      // handle invalid username
      if (results.length === 0) {
        return res.status(400).json({ success: false, message: "Invalid username or password" });
      }
      
      const user = results[0];
      
      // check if password is valid
      const isMatch = await bcrypt.compare(password, user.password);
      // handle invalid password
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid username or password" });
      }
      
      // return user data if login success
      res.json({ success: true, message: "Login successful", user: { id: user.id, username: user.username, email: user.email } });
    });
  });
}

