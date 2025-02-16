import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from './Admin';
import HomePage from './HomePage';
import People from './People';
import Hall from './Hall';
import Login from './Login';
import Home from './Home';
import ForgotPassword from './ForgotPassword';
import OTP from './OTP';
import ResetPassword from './ResetPassword';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />  {/* Set Admin as default */}
      <Route path="/login" element={<Login />} />  {/* Fixed path */}
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/people" element={<People />} />
      <Route path="/hall" element={<Hall />} />
      <Route path="/home" element={<Home />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp" element={<OTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
