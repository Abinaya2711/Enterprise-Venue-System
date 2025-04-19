import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import ForgotPassword from "./ForgotPassword";
import OTP from "./Otp";
import ResetPassword from "./ResetPassword";

function App1() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />  {/* Login Page as Default */}
      <Route path="/home" element={<Home />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp" element={<OTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default App1;