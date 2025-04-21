import React, { useEffect } from 'react'
import './People.css'
import { Link } from 'react-router-dom'
import Content from './Content'


const People = () => {

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
        
    </header>
    <Content />
    </div>
  )
}

export default People
