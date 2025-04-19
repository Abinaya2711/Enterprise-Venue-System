import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'

const HomePage = () => {
  
  return (
    <div className='body'>
      <header>
        
        <div className="logo"><i className="fas fa-crown"></i> Admin Dashbord</div>
            <nav>
                <ul className="nav-links">
                    <li><Link to='/homePage' style={{color:'yellow'}}>Home</Link></li>
                    <li><Link to='/people' >People</Link></li>
                    <li><Link to='/hall' >Hall</Link></li>
                </ul>
            </nav>
            
        
        </header>
    
    
 
    </div>
  )
}

export default HomePage
