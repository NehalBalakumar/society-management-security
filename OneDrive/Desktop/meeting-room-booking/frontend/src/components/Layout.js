import React from "react";
import { useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="app-container">

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">MRB</h2>

        <div className="menu">
          <p onClick={() => navigate("/dashboard")}>Dashboard</p>
          <p onClick={() => navigate("/create")}>Create Booking</p>
          <p onClick={() => navigate("/my-bookings")}>My Bookings</p>
        </div>
      </div>

      {/* Main Section */}
      <div className="main">

        <div className="topbar">
          <h3>Meeting Room System</h3>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="content">
          {children}
        </div>

      </div>
    </div>
  );
}

export default Layout;
