import React, { useEffect } from 'react'
import {FaTrashAlt} from 'react-icons/fa'
import './Content.css'
import { useState} from 'react'

const Content = () => {
  const [newname,setName]=useState('')
  const [email,setEmail]=useState('')
  const [role,setRole]=useState('')
  const [password,setPassword]=useState('')
  const [items,setItems]=useState([])
  const [show,setShow]=useState(false)
  const handleForm=()=>{
    setShow(true)
  }
  const handleClose=()=>{
      setShow(false)
  }
  useEffect(()=>{
    const fetchItems=async()=>{
      try{
        const response=await fetch("http://localhost:3500/data")
        if(response.ok){
          const result= await response.json();
          setItems(result.data)
        }
        else{
          console.log("there is an error i fetching")
        }
      }catch(err){
        console.log("in the catch block",err)
      }
    }
    fetchItems()
  },[])

const handleSubmit=async(e)=>{
  e.preventDefault();
  if (!newname || !email || !role || !password) {
    alert("All fields are required");
    return;
  }
  
  const addNewpeople={newname,email,password,role}
    console.log("Sending this data to backend:", addNewpeople); 
   const postoption={
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(addNewpeople)
   };
  try{
    const result=await fetch("http://localhost:3500/add-people",postoption)
    const data = await result.json();
    console.log(data);

    if(result.ok){
      console.log("added succesfully")
      setShow(false)
      const updatedResponse = await fetch("http://localhost:3500/data");
      const updatedData = await updatedResponse.json();
      setItems(updatedData.data);
    }
    else{
      console.log("Error adding:", data?.message || "Unknown error");

    }
  }catch(error){
    console.log("there is an error")
  }
}
const handleDelete=async(id)=>{
  try{
    const response=await fetch(`http://localhost:3500/delete/${id}`,{
      method:'DELETE'
    });
    if(response.ok){
      console.log("Successfully deleted")
      alert("Successfullly deleted")

      const updatedResponse = await fetch("http://localhost:3500/data");
      const updatedData = await updatedResponse.json();
      setItems(updatedData.data);
    }
    else{
      console.log("there is an error in the try block")
  }
  }catch(err){
    console.log("there is an error in the delete",err)
  }
}
    
  return (
    <div>
      <form className='searchForm' >
                <input
                    type='text'
                    autoFocus
                    placeholder='searchItem'
                    id='search'
                    role='searchbox'
                    className='iptype'
                />
                <button  className='addbtn' onClick={handleForm} type='button'>
                    +
                </button>
        </form>
      <div className='main'>
      {(items.length)?(
            <ul>
                
                {items.map((item) => (
              <li className='item' key={item.id}>
                <label>{item.name}</label>
                <label>{item.email}</label>
                <label>{item.role}</label>
                <FaTrashAlt
                  role='button'
                  tabIndex='0'
                  onClick={() => handleDelete(item.id)}
                />
              </li>
            ))}
            
            </ul>
        ):(
        <p style={{marginTop:'2rem'}}>
Your list is empty</p>
)}
      </div>
      {show &&(
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={handleClose}>&times;</button>
                <h2>Add People</h2>
                <form className='peopleaddform' onSubmit={handleSubmit}>
                <label htmlFor='addPeople'>Name</label>
                    <input type='text' placeholder='Enter the Name' id='addPeople' value={newname}
                        onChange={(e) => setName(e.target.value)} /><br />

                    <label htmlFor='emailid'>Email</label>
                    <input type='email' placeholder='Enter the email' id="emailid" value={email}
                        onChange={(e) => setEmail(e.target.value)} /><br />

                    <label htmlFor='role'>Role</label>
                    <input type='text' placeholder='Enter the role' id="role" value={role}
                        onChange={(e) => setRole(e.target.value)} /><br />

                    <label htmlFor='pass'>PassWord</label>
                    <input type='password' placeholder='Enter the password' id="pass" value={password}
                    onChange={(e)=>setPassword(e.target.value)}/><br />

                    <button type='submit' className='subbtn' >Submit</button>
                </form>
            </div>
        </div>
        )}
    </div>
  )
}

export default Content
