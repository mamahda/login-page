import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerAuth } from "../utils/register-auth";
import styles from "../styles/register.module.css"; 

function Register() {

  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add(styles.registerpage);
    return () => {
      document.body.classList.remove(styles.registerpage);
    };
  }, []);

  function handleLogin() {
    navigate("/login");
  }

  function handleRegister(e) {
    e.preventDefault();

    if (password !== re_password) {
      alert("Passwords do not match.");
      return;
    }

    registerAuth(username, email, password, setMessage)
      .then((isRegistered) => {
        if (isRegistered) {
          alert("Registration Success.");
          navigate("/login");
        } else {
          alert("Registration failed.");
        }
      })
      .catch((error) => {
        alert("An error occurred. Please try again later.");
      });
  }

  return (
    <div className={styles.registercontainer}>
      <h1>Register Here</h1>
      <form className={styles.registerform} onSubmit={handleRegister}>
        <label className={styles.registerlabel} htmlFor="username">Username:</label>
        <input
          className={styles.registerusername}
          type="text"
          name="username"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className={styles.registerlabel} htmlFor="email">Email:</label>
        <input
          className={styles.registeremail}
          type="text"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />


        <label className={styles.registerlabel} htmlFor="password">Password:</label>
        <input
          className={styles.registerpassword}
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className={styles.registerlabel} htmlFor="re_password"></label>
        <input
          className={styles.registerpassword}
          type="password"
          name="re_password"
          id="re_password"
          placeholder="Enter your password again"
          value={re_password}
          onChange={(e) => setRePassword(e.target.value)}
        />

        <button className={styles.registerbutton} type="submit">Register</button>

      </form>
      <div className={styles.registerlogin}>
        <button className={styles.gotologinbutton} onClick={handleLogin}>Login</button>
      </div>

    </div>

  );
}

export default Register;


