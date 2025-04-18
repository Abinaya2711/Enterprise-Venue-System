import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Admin.css'

const Otp = () => {
    const navigate=useNavigate()
    const handleChange=(event)=>{
        event.preventDefault();
        navigate('/NewPassword')
    }
  return (
    <div className='wrapper'>
      <div className="container">
        <h2>OTP Verification</h2>
        <form  className="login-form" onSubmit={handleChange}>

            <label htmlFor="otp">Enter the OTP:</label>
            <input type="text" id="otp" name="otp" required /><br/>

            <button type="submit" >Verify OTP</button>
        </form>
        
    </div>
    </div>
  )
}

export default Otp
