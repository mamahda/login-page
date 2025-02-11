import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAuth } from "../utils/auth";
import "../styles/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault(); 
    
    loginAuth(username, password)
      .then((isAuthenticated) => {
        if (isAuthenticated) {
          setErrorMessage("Login Success.");
          navigate("/Home");
        } else {
          setErrorMessage("Username or password is incorrect.");
        }
      })
      .catch((error) => {
        setErrorMessage("An error occurred. Please try again later.");
      });
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="remember_me">
          <input
            type="checkbox"
            name="remember_me"
            id="remember_me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember me?
        </label>

        <button type="submit">Login</button>

        {/* Show error message if login failed */}
        {errorMessage && <div class="error_message" className="error-message">{errorMessage}</div>}
      </form>

      <div className="register">
      </div>
    </div>
  );
}

export default Login;

