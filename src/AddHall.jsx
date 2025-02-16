import React from 'react'
import './AddPeople.css'
import { useState } from 'react'

const AddHall = ({search,setSearch,handleSubmit,newItem,setNewItem,hallno,setHallNo}) => {
    const [show,setShow]=useState(false)
        const handleForm=()=>{
            setShow(true)
        }
        const handleClose=()=>{
            setShow(false)
        }
  return (
    <div>
        <form className='searchForm' onSubmit={(e)=>e.preventDefault()}>
            <input type='text' autoFocus placeholder='searchItem' id='search' role='searchbox' value={search} onChange={(e)=>setSearch(e.target.value)}/>
            <button onClick={handleForm}>+</button>
        </form>
        {show &&(
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={handleClose}>&times;</button>
                <h2>Add Hall</h2>
                <form className='peopleaddform' onSubmit={handleSubmit}>
                    <label htmlFor='addPeople'>Name</label>
                    <input type='text' placeholder='Enter the Name' id='addPeople' value={newItem}
                        onChange={(e) => setNewItem(e.target.value)} /><br />

                    <label htmlFor='emailid'>HallNo</label>
                    <input type='number' placeholder='Enter the HallNO' id="emailid" value={hallno}
                        onChange={(e) => setHallNo(e.target.value)} /><br />

                    <button type='submit' onSubmit={handleClose}>Submit</button>
                </form>
            </div>
        </div>
        )}
    </div>
  )
}

export default AddHall
