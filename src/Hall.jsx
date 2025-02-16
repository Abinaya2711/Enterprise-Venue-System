import React, { useState,useEffect } from 'react'
import './People.css'
import AddHall from './AddHall'
import HallContent from './HallContent'
import { Link } from 'react-router-dom'

const Hall = () => {
  const[search,setSearch]=useState('')
        const[newItem,setNewItem]=useState('')
       const[hallno,setHallNo]=useState('')
        useEffect(()=>{
          JSON.parse(localStorage.getItem("Halladd"))||[]
        },[])
       const[items,setItems]=useState([{
                     id:1,
                     item:"Seminar Hall",
                     hallno:203
                     
                 },
                 {
                     id:2,
                     item:"Smart Class",
                     hallno:2
                     
                 },
             ])
        const handleSubmit=(e)=>{
            e.preventDefault()
            if(!newItem || !hallno) return;
            addItem(newItem,hallno)
            setNewItem('')
            setHallNo('')
        }
        const addItem=(item,hallno)=>{
            const id=items.length?items[items.length-1].id+1:1
            const addNewItem={id,item,hallno: Number(hallno)}
            const listItem=[...items,addNewItem]
            setItems(listItem);
            localStorage.setItem("Halladd",JSON.stringify(listItem))
        }
        const handleDelete=(id)=>{
          const listItem=items.filter((item)=>
        item.id !==id)
        setItems(listItem)
        localStorage.setItem("Halladd",JSON.stringify(listItem))
        }
  return (
    <div>
      <header>
        
        <div className="logo"><i className="fas fa-crown"></i> Admin Dashbord</div>
            <nav>
                <ul className="nav-links">
                    <li><Link to='/homePage' >Home</Link></li>
                    <li><Link to='/people' >People</Link></li>
                    <li><Link to='/hall' style={{color:'yellow'}} >Hall</Link></li>
                </ul>
            </nav>
            <div className="hamburger">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
    </header>
    <AddHall
    search={search}
    setSearch={setSearch}
    newItem={newItem}
    setNewItem={setNewItem}
   hallno={hallno}
   setHallNo={setHallNo}
    handleSubmit={handleSubmit}
    />
    <HallContent
    items={items.filter(item=>(item.item).toLowerCase().includes(search.toLowerCase()))}
    handleDelete={handleDelete}
    />
    </div>
  )
}

export default Hall
