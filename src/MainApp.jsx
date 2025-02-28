import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";  // Admin Panel
import App1 from "./App1";  // Authentication Pages

function MainApp() {
  return (
    <Routes>
      <Route path="/*" element={<App />} />  {/* Admin Panel Routes */}
      <Route path="/auth/*" element={<App1 />} />  {/* Authentication Routes */}
    </Routes>
  );
}

export default MainApp;
