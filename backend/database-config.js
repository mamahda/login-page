import mysql from "mysql";
import apiLogin from "./api-login.js";
import apiRegister from "./api-register.js";

// initialize database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "221122",
  database: "login_page"
});

// initialize api
apiLogin();
apiRegister();

export default db;
