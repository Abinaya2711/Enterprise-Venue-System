import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const HomePage = () => {
  const [customer, setBookings] = useState([]);
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:3500/api/customer');
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const isSameDate = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isSameMonth = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth()
    );
  };

  const getFilteredCustomers = () => {
    if (!searchDate) return customer;

    const exactMatches = customer.filter((booking) =>
      isSameDate(booking.event_date, searchDate)
    );

    if (exactMatches.length > 0) return exactMatches;

    return customer.filter((booking) =>
      isSameMonth(booking.event_date, searchDate)
    );
  };

  const filteredCustomers = getFilteredCustomers();

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredCustomers.map(({ name, phone, event_date }) => ({
        Name: name,
        Phone: phone,
        Event_Date: new Date(event_date).toLocaleDateString(),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "CustomerDetails");

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(fileData, "CustomerDetails.xlsx");
  };

  return (
    <div className='body'>
      <header>
        <div className="logo"><i className="fas fa-crown"></i> Admin Dashboard</div>
        <nav>
          <ul className="nav-links">
            <li><Link to='/homePage' style={{ color: 'yellow' }}>Home</Link></li>
            <li><Link to='/people'>People</Link></li>
            <li><Link to='/hall'>Hall</Link></li>
          </ul>
        </nav>
        <div className="hamburger">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </header>

      <main>
        <div className="bookings-section">
          <h2>Booked Customer Details</h2>

          <label htmlFor="searchDate">Filter by Date:</label>
          <input
            type="date"
            id="searchDate"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            style={{ marginLeft: '10px', marginBottom: '20px' }}
          />

          {filteredCustomers.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <table className="booking-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Event Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.name}</td>
                    <td>{booking.phone}</td>
                    <td>{new Date(booking.event_date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <button onClick={exportToExcel} className="export-btn" id='downloadExcelBtn'>Download Excel</button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
