import React, { useState } from "react";
import "./Modal.css";

const Modal = ({ selectedDate, closeModal, bookings, handleBook }) => {
  const { day, month, year, dateKey } = selectedDate;
  const isBooked = bookings[dateKey];

  const [formData, setFormData] = useState({ name: "", phone: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleBook(dateKey, formData.name, formData.phone);
    setFormData({ name: "", phone: "" });
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>X</button>
        <h2>Booking for {day}-{month + 1}-{year}</h2>

        {isBooked ? (
          <p className="fully-booked-message">
            Already booked by: <br />
            <strong>{bookings[dateKey].name}</strong><br />
            📞 {bookings[dateKey].phone}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="booking-form">
            <label>Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <label>Phone Number:</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />

            <button type="submit" className="book-btn">Book</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Modal;
