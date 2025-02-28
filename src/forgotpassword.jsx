import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = () => {
    if (email) {
      navigate("/auth/otp");
    } else {
      alert("Please enter your registered email.");
    }
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      <input type="email" placeholder="Enter Registered Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSendOTP}>Send OTP</button>
    </div>
  );
}

export default ForgotPassword;






