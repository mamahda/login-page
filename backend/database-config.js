import mysql from "mysql";
import {app} from "../main.js";

const db = mysql.createConnection({
  "host": "localhost",
  "user": "root",
  "password": "221122",
  "database": "login_page"
});

app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      throw err
    }
    res.json({
      success: true,
      message: 'success',
      data: results,
    });
  });
});

export default db;
