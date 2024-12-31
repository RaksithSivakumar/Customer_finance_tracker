import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      if (response.data.success) {
        const { role, token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "worker") {
        navigate("/worker/dashboard");
      } else if (role === "admin") {
        navigate("/admin/dashboard");
      }
      } else {
        setMessage("Invalid credentials!");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error occurred during login.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Sign in</h1>
        <p>Fill in your credentials and click on the Sign in button</p>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label>Password</label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign in</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;