import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/OTP.css";

function OTP() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      navigate("/reset-password");
    } else {
      alert("Enter a valid 6-digit OTP.");
    }
  };

  return (
    <div className="container">
      <h2>Enter OTP</h2>
      <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <button onClick={handleVerifyOTP}>Verify</button>
    </div>
  );
}

export default OTP;
