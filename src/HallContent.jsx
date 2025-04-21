import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import './Content.css';

const HallContent = ({ items, handleDelete }) => {
  return (
    <main>
      {items.length ? (
        <ul>
          {items.map((item) => (
            <li className="item" key={item.id}>
              <label>{item.item}</label>
              <FaTrashAlt
                role="button"
                tabIndex="0"
                onClick={() => handleDelete(item.item)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ marginTop: '2rem' }}>Your list is empty</p>
      )}
    </main>
  );
};

export default HallContent;
