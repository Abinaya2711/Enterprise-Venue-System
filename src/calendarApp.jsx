import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

const CalendarApp = () => {
  const [halls, setHalls] = useState([]); // State to hold hall data

  useEffect(() => {
    // Fetch hall data from the backend
    axios
      .get("http://localhost:3500/api/halls")
      .then((res) => {
        console.log(res.data); // Log response data to ensure correct structure
        setHalls(res.data); // Update halls state with response data
      })
      .catch((err) => console.error(err));
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="app-container">
      {/* Dynamic navigation for halls fetched from API */}
      <nav className="nav-bar">
        {halls.map((hall) => (
          <Link
            key={hall.hallId} // Use hallId for a unique key
            to={`/calendar/${hall.hallId}`} // Link using hallId
            className="nav-link"
          >
            {hall.item} {/* Display hall name */}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default CalendarApp;

