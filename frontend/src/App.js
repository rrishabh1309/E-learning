import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Courses from "./Components/Courses";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        {/* Add fallback route for 404 */}
        <Route path="*" element={<div className="not-found">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
