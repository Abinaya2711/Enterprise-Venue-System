import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email && password) {
      navigate("/home");
    } else {
      alert("Please enter email and password.");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p onClick={() => navigate("/forgot-password")} className="forgot-link">Forgot Password?</p>
    </div>
  );
}

export default Login;
