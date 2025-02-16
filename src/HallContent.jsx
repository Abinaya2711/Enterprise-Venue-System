import React from 'react'
import {FaTrashAlt} from 'react-icons/fa'
import './Content.css'

const HallContent = ({items,handleDelete}) => {
  return (
    <div>
      <main>
        {(items.length)?(
            <ul>
                
                {items.map((item) => (
              <li className='item' key={item.id}>
                <label>{item.item}</label>
                <label>{item.hallno}</label>
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
      </main>
    </div>
  )
}

export default HallContent
