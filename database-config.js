import mysql from "mysql";
import "./main.js";

const db = mysql.createConnection({
  "host": "localhost",
  "user": "root",
  "password": "221122",
  "database": "login_page"
});

export default db;
