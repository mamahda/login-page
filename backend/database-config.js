import mysql from "mysql";
import apiLogin from "./api-login.js";
import apiRegister from "./api-register.js";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "221122",
  database: "login_page"
});

apiLogin();
apiRegister();

export default db;
