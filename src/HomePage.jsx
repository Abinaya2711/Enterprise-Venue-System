import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'

const HomePage = () => {
  const [selectedDates, setSelectedDates] = useState([]);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [calendarDays, setCalendarDays] = useState([]);
    const [showForm, setShowForm] = useState(false);
    
  
    useEffect(() => {
      generateCalendar(currentYear, currentMonth);
    }, [currentYear, currentMonth]);
  
    const generateCalendar = (year, month) => {
      const today = new Date();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const dayOffset = firstDay === 0 ? 6 : firstDay - 1;
  
      let calendarData = [];
      let dateCount = 1;
  
      for (let i = 0; i < 6; i++) {
        const week = [];
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < dayOffset) {
            week.push(null);
          } else if (dateCount <= daysInMonth) {
            week.push(new Date(year, month, dateCount));
            dateCount++;
          } else {
            week.push(null);
          }
        }
        calendarData.push(week);
      }
  
      setCalendarDays(calendarData);
    };
  
   
  
    const handlePrevMonth = () => {
      setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
      if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
    };
  
    const handleNextMonth = () => {
      setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
      if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
    };
    
  return (
    <div className='body'>
      <header>
        
        <div className="logo"><i className="fas fa-crown"></i> Admin Dashbord</div>
            <nav>
                <ul className="nav-links">
                    <li><Link to='/homePage' style={{color:'yellow'}}>Home</Link></li>
                    <li><Link to='/people' >People</Link></li>
                    <li><Link to='/hall' >Hall</Link></li>
                </ul>
            </nav>
            <div className="hamburger">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        
    </header>
    
    <div className="calendar-container">
        
        <div id="calendar">
            <div className="navigation">
              <button onClick={handlePrevMonth} id="prevMonth">&lt;</button>
              <h3 id="monthYear">{new Date(currentYear, currentMonth).toLocaleString("default", { month: "long", year: "numeric" })}</h3>
              <button onClick={handleNextMonth} id="nextMonth">&gt;</button>
            </div>

            <table id="calendarTable">
              <thead>
                <tr>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <th key={day}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody id="calendarBody">
                {calendarDays.map((week, i) => (
                  <tr key={i}>
                    {week.map((date, j) => (
                      <td
                        key={j}
                        className={`day ${
                          date
                            ? date < new Date() ? "disabled" : selectedDates.includes(`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`) ? "selected" : ""
                            : "empty"
                        }`}
                        
                      >
                        {date ? date.getDate() : ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
        <footer>
            <span className="dot" style={{backgroundColor: 'orange'}}></span> Booked<span></span>
            <span className="dot" style={{backgroundColor:' #cc9b82'}}></span>Past Booking<span></span>
            <span className="dot" style={{backgroundColor: 'black'}}></span> Available
        </footer>
    </div>
    <button id="downloadExcelBtn">Download Excel</button>
    </div>

 
    </div>
  )
}

export default HomePage
