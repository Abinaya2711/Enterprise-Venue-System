import React from 'react'
import { useState } from 'react'
import './AddPeople.css'

const AddPeople = ({search,setSearch,handleSubmit,newItem,setNewItem,email,setEmail,role,setRole}) => {
    const [show,setShow]=useState(false)
    const handleForm=()=>{
        setShow(true)
    }
    const handleClose=()=>{
        setShow(false)
    }
    
  return (
    <div>
        <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
                <input
                    type='text'
                    autoFocus
                    placeholder='searchItem'
                    id='search'
                    role='searchbox'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='iptype'
                />
                <button onClick={handleForm} className='addbtn'>
                    +
                </button>
        </form>
        {show &&(
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={handleClose}>&times;</button>
                <h2>Add People</h2>
                <form className='peopleaddform' onSubmit={handleSubmit}>
                    <label htmlFor='addPeople'>Name</label>
                    <input type='text' placeholder='Enter the Name' id='addPeople' value={newItem}
                        onChange={(e) => setNewItem(e.target.value)} /><br />

                    <label htmlFor='emailid'>Email</label>
                    <input type='email' placeholder='Enter the email' id="emailid" value={email}
                        onChange={(e) => setEmail(e.target.value)} /><br />

                    <label htmlFor='role'>Role</label>
                    <input type='text' placeholder='Enter the role' id="role" value={role}
                        onChange={(e) => setRole(e.target.value)} /><br />

                    <button type='submit' className='subbtn' >Submit</button>
                </form>
            </div>
        </div>
        )}
    </div>
  )
}

export default AddPeople
