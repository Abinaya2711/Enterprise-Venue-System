import React, { useState } from "react";
import "./Modal.css";

const periods = ["Period 1", "Period 2", "Period 3", "Period 4", "Period 5", "Period 6", "Period 7"];

const Modal = ({ selectedDate, closeModal, bookings, handleBook }) => {
  const dateKey = `${selectedDate.day}-${selectedDate.month}-${selectedDate.year}`;
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [formData, setFormData] = useState({ name: "", year: "", section: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleBook(dateKey, selectedPeriod);
    setSelectedPeriod(null);
    setFormData({ name: "", year: "", section: "" });
  };

  const isPeriodBooked = (period) => bookings[dateKey]?.has(period);
  const isFullyBooked = bookings[dateKey] && bookings[dateKey].size === 7;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>X</button>
        <h2>Booking for {selectedDate.day}-{selectedDate.month + 1}-{selectedDate.year}</h2>

        {isFullyBooked ? (
          <p className="fully-booked-message">All periods are booked for this date.</p>
        ) : !selectedPeriod ? (
          <div className="periods">
            {periods.map((period) => (
              <button
                key={period}
                className={`period-btn ${isPeriodBooked(period) ? "booked" : ""}`}
                onClick={() => !isPeriodBooked(period) && setSelectedPeriod(period)}
                disabled={isPeriodBooked(period)}
              >
                {period}
              </button>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="booking-form">
          <label>Name:</label>
          <input 
            type="text" 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
            required 
          />
        
        <label>Year:  
            <select 
              value={formData.year} 
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              required
            >
              <option value="" disabled hidden>Select Year</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
            </select>
          </label>

          <label>Section:  
            <select 
              value={formData.section} 
              onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              required
            >
              <option value="" disabled hidden>Select Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </label>

        
          <button type="submit" className="book-btn">Book</button>
        </form>
        
         
        )}
      </div>
    </div>
  );
};

export default Modal;
