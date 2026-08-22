import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged Out Successfully!");
    navigate("/");
  };

  return (
    <nav
      style={{
        backgroundColor: "#2E8B57",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: "white", margin: 0 }}>
        Carbon Footprint Tracker
      </h2>

      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
          Dashboard
        </Link>

        <Link to="/calculator" style={{ color: "white", textDecoration: "none" }}>
          Calculator
        </Link>

        <Link to="/history" style={{ color: "white", textDecoration: "none" }}>
          History
        </Link>

        <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>
          Profile
        </Link>

        <Link to="/ecotips" style={{ color: "white", textDecoration: "none" }}>
          Eco Tips
        </Link>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;