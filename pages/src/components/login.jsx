import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginAuth } from "../utils/login-auth";
import styles from "../styles/login.module.css"; 

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add(styles.loginpage);
    return () => {
      document.body.classList.remove(styles.loginpage);
    };
  }, []);

  function handleLogin(e) {
    e.preventDefault(); 

    loginAuth(username, password)
    .then((isAuthenticated) => {
      if (isAuthenticated) {
        if (window.confirm("Login Success! Do you want to continue?")) {
  navigate("/Home");
}
      } else {
        alert("Username or password is incorrect.");
      }
    })
    .catch(() => {
      alert("An error occurred. Please try again later.");
    });
  }

  function handleRegister(e) {
    e.preventDefault();
    navigate("/register");
  }

  return (
    <div className={styles.logincontainer}>
      <h1>Login</h1>
      <form className={styles.loginform} onSubmit={handleLogin}>
        <label className={styles.loginlabel} htmlFor="username">Username or email:</label>
        <input
          className={styles.loginusername}
          type="text"
          name="username"
          id="username"
          placeholder="Enter your username or email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className={styles.loginlabel} htmlFor="password">Password:</label>
        <input
          className={styles.loginpassword}
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.loginbutton} type="submit">Login</button>

      </form>
      <div className={styles.loginregister}>
        <button className={styles.gotoregisterbutton} onClick={handleRegister}>Register</button>
      </div>

    </div>
  );
}

export default Login;

