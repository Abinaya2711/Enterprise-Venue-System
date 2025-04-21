import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "./Modal";
import axios from "axios";
import "./Calendar.css";

const CalendarPage = () => {
  const { hallId } = useParams(); // Get hallId from URL if present
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookings, setBookings] = useState({});
  const [hall, setHall] = useState(null);
  const [halls, setHalls] = useState([]);

  // Fetch all halls for navigation
  useEffect(() => {
    axios
      .get("http://localhost:3500/api/halls")
      .then((res) => setHalls(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch current hall based on hallId
  useEffect(() => {
    if (hallId) {
      axios
        .get(`http://localhost:3500/api/halls/${hallId}`)
        .then((res) => setHall(res.data))
        .catch((err) => console.error(err));
    } else {
      setHall(null);
    }
  }, [hallId]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const handleDateClick = (day) => {
    setSelectedDate({ day, month, year });
  };

  const handleBook = (dateKey, period) => {
    setBookings((prev) => {
      const updated = { ...prev };
      if (!updated[dateKey]) updated[dateKey] = new Set();
      updated[dateKey].add(period);
      return updated;
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

  return (
    <div className="calendar-container">
      {/* Navigation bar visible on both /calendar and /calendar/:hallId */}
      <nav className="nav-bar">
        {halls.map((h) => (
          <Link
            key={h.hallId}
            to={`/calendar/${h.hallId}`}
            className={`nav-link ${hallId === String(h.hallId) ? 'active' : ''}`}
          >
            {h.item}
          </Link>
        ))}
      </nav>

        {/* Show hall name if selected */}
        {hallId && (
  <div className="calendar-wrapper">
    <h2 className="hall-heading">
      {halls.find((h) => String(h.hallId) === hallId)?.item || "Selected Hall"}
    </h2>

    <div className="calendar">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>
          {new Date(year, month).toLocaleString("default", { month: "long" })} {year}
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
  </div>
)}

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

