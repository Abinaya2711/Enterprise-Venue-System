import React, { useState } from "react";
import Modal from "./Modal";
import "./Calendar.css";

const CalendarPage = ({ hallId }) => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookings, setBookings] = useState({});

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const handleDateClick = (day) => {
    setSelectedDate({ day, month, year });
  };

  const handleBook = (dateKey, period) => {
    setBookings((prev) => {
      const updatedBookings = { ...prev };
      if (!updatedBookings[dateKey]) updatedBookings[dateKey] = new Set();
      updatedBookings[dateKey].add(period);
      return updatedBookings;
    });
  };

  const prevMonth = () => {
    setMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (month === 0) setYear((prev) => prev - 1);
  };

  const nextMonth = () => {
    setMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (month === 11) setYear((prev) => prev + 1);
  };

  const isDateFullyBooked = (dateKey) =>
    bookings[dateKey] && bookings[dateKey].size === 7;

  const formattedHallName = hallId
    ? hallId.replace(/-/g, " ").toUpperCase()
    : "CALENDAR";

  return (
    <div className="calendar-container">
      <h2 className="hall-heading">{formattedHallName} BOOKING</h2>

      <div className="calendar">
        <div className="calendar-header">
          <button onClick={prevMonth}>&lt;</button>
          <h2>
            {new Date(year, month).toLocaleString("default", { month: "long" })}{" "}
            {year}
          </h2>
          <button onClick={nextMonth}>&gt;</button>
        </div>

        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}

          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="empty"></div>
          ))}

          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const dateKey = `${day}-${month}-${year}`;
            const isToday =
              today.getDate() === day &&
              today.getMonth() === month &&
              today.getFullYear() === year;

            return (
              <div
                key={day}
                className={`day ${isToday ? "today" : ""} ${
                  isDateFullyBooked(dateKey) ? "fully-booked" : ""
                }`}
                onClick={() => handleDateClick(day)}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <Modal
          selectedDate={selectedDate}
          closeModal={() => setSelectedDate(null)}
          bookings={bookings}
          handleBook={handleBook}
        />
      )}
    </div>
  );
};

export default CalendarPage;
