
import {FaTrashAlt} from 'react-icons/fa'
import './Content.css'

const Content = ({items,handleDelete}) => {
    
  return (
    <div>
      <main>
        {(items.length)?(
            <ul>
                
                {items.map((item) => (
              <li className='item' key={item.id}>
                <label>{item.item}</label>
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
      </main>
    </div>
  )
}

export default Content
