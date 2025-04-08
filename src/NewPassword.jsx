import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const NewPassword = () => {
    const navigate = useNavigate();

    const handleChange = (event) => {
        event.preventDefault();
        navigate('/Calendar');
    };

   

    return (
        <div className='wrapper'>
            <div className="container">
                <h2>New Password</h2>
                <form className="login-form" onSubmit={handleChange}>
                    <label htmlFor="text">New Password:</label>
                    <input type="text" id="password" name="Password" required /><br />

                    <label htmlFor="text">Confirm Password:</label>
                    <input type="text" id="password" name="Password" required /><br />

                    <button type="submit">Change Password</button>
                </form>

                
            </div>
        </div>
    );
};

export default NewPassword;
