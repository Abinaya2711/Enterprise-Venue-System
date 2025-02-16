import React, { useEffect } from 'react'
import './People.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './HomePage.css'
import AddPeople from './AddPeople'
import Content from './Content'
import { useNavigate } from 'react-router-dom'

const People = () => {
  
  const[search,setSearch]=useState('')
      const[newItem,setNewItem]=useState('')
      const[email,setEmail]=useState('')
      const[role,setRole]=useState('')
      const navigate=useNavigate()
      
      useEffect(()=>{
        JSON.parse(localStorage.getItem("Peopleadd"))||[]
      },[])
     const[items,setItems]=useState([{
                   id:1,
                   item:"Ajitha",
                   email:"ajitha@gmail.com",
                   role:"Admin"
               },
               {
                   id:2,
                   item:"Aishu",
                   email:"aishwarya@gmail.com",
                   role:"Faculty"
               },
               {
                   id:3,
                   item:"Abinaya",
                   email:"abinaya2gmail.com",
                   role:"Faculty"
               },
               {
                id:4,
                item:"Anu",
                email:"anu@gamil.com",
                role:"Faculty"
               },
           ])
      const handleSubmit=(e)=>{
          e.preventDefault()
          if(!newItem || !email|| !role) return;
          addItem(newItem,email,role)
          setNewItem('')
          setEmail('');
          setRole('');
      }
      const addItem=(item,email, role)=>{
          const id=items.length?items[items.length-1].id+1:1
          const addNewItem={id,item,email,role}
          const listItem=[...items,addNewItem]
          setItems(listItem);
          localStorage.setItem("Peopleadd",JSON.stringify(listItem))
      }
      const handleDelete=(id)=>{
        const listItem=items.filter((item)=>
      item.id !==id)
      setItems(listItem)
      localStorage.setItem("Peopleadd",JSON.stringify(listItem))
      }
  return (
    <div>
      <header>
        
        <div className="logo"><i className="fas fa-crown"></i> Admin Dashbord</div>
            <nav>
                <ul className="nav-links">
                    <li><Link to='/homePage' >Home</Link></li>
                    <li><Link to='/people' style={{color:'yellow'}}>People</Link></li>
                    <li><Link to='/hall' >Hall</Link></li>
                </ul>
            </nav>
            <div className="hamburger">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        
    </header>
    <AddPeople
    search={search}
    setSearch={setSearch}
    newItem={newItem}
    setNewItem={setNewItem}
    email={email}
    setEmail={setEmail}
    role={role}
    setRole={setRole}
    handleSubmit={handleSubmit}
    />
    <Content items={items.filter(item=>(item.item).toLowerCase().includes(search.toLowerCase()))}
    handleDelete={handleDelete}
    />
    </div>
  )
}

export default People
