import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleBackToRegister = () => {
    navigate("/register");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      const { user, token } = data;
      if (!user) {
        throw new Error("User data is missing in response");
      }
      // Store token for future requests
      localStorage.setItem("token", token);
      // navigation based on role
      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error", error);
      setError("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleBackToRegister}>Register an account</button>
    </div>
  );
}

export default LoginPage;
