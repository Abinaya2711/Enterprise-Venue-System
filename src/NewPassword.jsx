import React, { useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import './Admin.css';

const NewPassword = () => {
    const navigate = useNavigate();
    const[newpassword,setNewpassword]=useState('')
    const [confirmpass,setConfirmpass]=useState('')
    const [loginMessage, setLoginMessage] = useState('');
    const {token}=useParams('')

    const handleSubmit=async (event) => {
        event.preventDefault();
        if(newpassword!=confirmpass){
          setLoginMessage("The password not match");
            setTimeout(() => {
                setLoginMessage('');
            }, 2000);
        }
        try{
            const response=await fetch(`http://localhost:3500/newpassword/${token}`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({newPassword: newpassword})
            })
            const data = await response.json();
            console.log(data.message);
            if(response.ok){
                setLoginMessage("Successfully password reset");
                    setTimeout(() => {
                        setLoginMessage('');
                    }, 1000);
                navigate('/');
            }
            else{
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
                <h2>New Password</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="text">New Password:</label>
                    <input type="text" id="password" name="Password" required onChange={(e)=>{setNewpassword(e.target.value)}} value={newpassword}/><br />

                    <label htmlFor="text">Confirm Password:</label>
                    <input type="password" id="password" name="Password" required onChange={(e)=>{setConfirmpass(e.target.value)}} value={confirmpass}/><br />

                    <button type="submit">Change Password</button>
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

export default NewPassword;
