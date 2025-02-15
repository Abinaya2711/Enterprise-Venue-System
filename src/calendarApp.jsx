import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CalendarPage from "./calendarPage";
import "./App.css";

const CalendarApp = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation Bar */}
        <nav className="nav-bar">
          <Link to="/" className="nav-link">Seminar Hall</Link>
          <Link to="/bookings" className="nav-link">Smart Room</Link>
          <Link to="/calendar" className="nav-link">Hall 01</Link>
        </nav>

        {/* Routing Pages */}
        <Routes>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/bookings" element={<CalendarPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default CalendarApp;
