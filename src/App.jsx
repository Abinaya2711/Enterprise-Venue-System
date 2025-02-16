import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admin from './Admin'
import HomePage from './HomePage'
import People from './People'
import Hall from './Hall'



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/people" element={<People />} />
        <Route path="/hall" element={<Hall />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  )
}

export default App