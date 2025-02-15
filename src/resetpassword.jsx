import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ResetPassword.css";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = () => {
    if (newPassword === confirmPassword && newPassword) {
      navigate("/home");
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="container">
      <h2>Reset Password</h2>
      <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default ResetPassword;
