import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Login = () => {
    const navigate = useNavigate();
    const[email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [loginMessage, setLoginMessage] = useState('');


  const handleSubmit = async(event) => {
         event.preventDefault();
      if ( !email ||!password) {
          alert("All fields are required");
          return;
        }
      try{
          const response= await fetch("http://localhost:3500/login1",{
              method:'POST',
              headers:{
                  'Content-Type':'application/json'
              },
              body:JSON.stringify({email,password})
            })
          if(response.ok){
              setLoginMessage("Successfully logged in!");
              setTimeout(() => {
                  setLoginMessage('');
                  navigate('/calendar/1');
              }, 1000);
          }
          else{
              setLoginMessage("Login failed. Please check your credentials.");
              setTimeout(() => setLoginMessage(''), 2000);
          }
      }catch(err){
          console.log("There is an error", err);
          setLoginMessage("Something went wrong. Try again.");
          setTimeout(() => setLoginMessage(''), 2000);
      }
    };
    const handleForgotPassword = () => {
        navigate('/ForgotPassword');
    }

    return (
        <div className='wrapper'>
            <div className="container">
                <h2>Faculty Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email ID:</label>
                    <input type="email" id="email" name="email" required onChange={(e)=>{setEmail(e.target.value)}} value={email}/><br />
                    

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required onChange={(e)=>{setPassword(e.target.value)}} value={password}/><br />    
                    

                    <button type="submit">Login</button>
                </form>

                <p className="forgot-password-link">
                    Forgot Password?
                    <span onClick={handleForgotPassword} style={{ color: 'blue', cursor: 'pointer' }}>
                        Click here
                    </span>
                </p>
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

export default Login;
