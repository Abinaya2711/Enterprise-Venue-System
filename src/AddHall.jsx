import React, { useEffect, useState } from 'react';
import './addpeople.css';

const AddHall = ({ newItem, setNewItem, handleSubmit, setShowModal, halls }) => {
  const [error, setError] = useState('');

  useEffect(() => {
    setNewItem('');
    setError('');
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isDuplicate = halls.some(
      (hall) => hall.item.trim().toLowerCase() === newItem.trim().toLowerCase()
    );
    if (isDuplicate) {
      setError('Hall name already exists!');
      return;
    }
  
    setError('');
    handleSubmit(); // ✅ Make sure this actually triggers the POST request
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
        <form className="peopleaddform" onSubmit={handleFormSubmit}>
          <label htmlFor="hallname">Enter Hall Name:</label>
          <input
            id="hallname"
            type="text"
            required
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Add Hall</button>
        </form>
      </div>
    </div>
  );
};

export default AddHall;


