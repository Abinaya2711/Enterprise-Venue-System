import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Login = () => {
    const navigate = useNavigate();

    const handleChange = (event) => {
        event.preventDefault();
        navigate('/Calendar');
    };

    const handleForgotPassword = () => {
        navigate('/ForgotPassword'); // Navigate to Forgot Password page
    };

    return (
        <div className='wrapper'>
            <div className="container">
                <h2>Faculty Login</h2>
                <form className="login-form" onSubmit={handleChange}>
                    <label htmlFor="email">Email ID:</label>
                    <input type="email" id="email" name="email" required /><br />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required /><br />

                    <button type="submit">Login</button>
                </form>

                <p className="forgot-password-link">
                    Forgot Password?
                    <span onClick={handleForgotPassword} style={{ color: 'blue', cursor: 'pointer' }}>
                        {' '}Click here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
