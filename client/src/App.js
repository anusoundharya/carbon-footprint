import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import History from "./components/History";
import Profile from "./components/Profile";
import Calculator from "./components/Calculator";
import EcoTips from "./components/EcoTips";
import Result from "./components/Result";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Calculator" element={<Calculator />} />
        <Route path="/EcoTips" element={<EcoTips />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;