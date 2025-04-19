import React, { useState } from 'react';
import './Admin.css';

const ForgotPassword = () => {
    const [loginMessage, setLoginMessage] = useState('');
    const[email,setEmail]=useState('')

    const handleSubmit= async(event) => {
        event.preventDefault();
        try{
            const response=await fetch("http://localhost:3500/forgotpassword",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email})
            })
            if(response.ok){
                setLoginMessage("Successfully Send Rest Link in your mail");
                setTimeout(() => {
                    setLoginMessage('');
                }, 1000);
            }else{
                setLoginMessage("Resetpassword failed. Please check your credentials.");
              setTimeout(() => setLoginMessage(''), 2000);
            }
        }catch(err){
            console.log("There is an error", err);
          setLoginMessage("Something went wrong. Try again.");
          setTimeout(() => setLoginMessage(''), 2000);
        }
    };

    return (
        <div className='wrapper'>
            <div className="container">
                <h2>Forgot Password</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Enter the Email ID:</label>
                    <input type="email" id="email" name="email" required onChange={(e)=>{setEmail(e.target.value)}} value={email}/><br />
                    <button type="submit">Verify</button>
                </form>
            </div>
            {loginMessage && (
                <div style={{
                    position: 'fixed',
                    top: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
                    zIndex: 9999
                }}>
                    {loginMessage}
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
