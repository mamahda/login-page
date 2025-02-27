import { app } from "../main.js";
import db from "./database-config.js";
import bcrypt from "bcryptjs";

// function to register user
export default function apiRegister() {
  // api for register user
  app.post('/api/users/register', async (req, res) => {
    const { username, email, password } = req.body;
    
    // check if username, email, and password is empty
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // check if username or password is registered
    db.query("SELECT * FROM users WHERE username = ? OR email = ?", [username, email], async (err, results) => {
      // handle database error
      if (err) {
        return res.status(500).json({ success: false, message: "Database error" });
      }
      // handle username or email already taken
      if (results.length > 0) {
        return res.status(400).json({ success: false, message: "Username or email already taken" });
      }

      try {
        // hash password 
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // insert user data to database
        db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
          [username, email, hashedPassword], 
          (err, result) => {
            // handle database error
            if (err) {
              return res.status(500).json({ success: false, message: "Database error" });
            }
            // return success message if user registered successfully
            res.status(201).json({ success: true, message: "User registered successfully" });
          }
        );
      } catch (error) {
        // handle server error
        res.status(500).json({ success: false, message: "Server error" });
      }
    });
  });
}

