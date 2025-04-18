import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const ForgotPassword = () => {
    const navigate = useNavigate();

    const handleChange = (event) => {
        event.preventDefault();
        // OTP logic can go here (API call etc.)
        navigate('/Otp'); // Navigate after handling
    };

    return (
        <div className='wrapper'>
            <div className="container">
                <h2>Forgot Password</h2>
                <form className="login-form" onSubmit={handleChange}>
                    <label htmlFor="email">Enter the Email ID:</label>
                    <input type="email" id="email" name="email" required /><br />
                    <button type="submit">Send OTP</button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
