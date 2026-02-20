import React from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Layout>
      <div className="dashboard-container">
        <h1>Dashboard</h1>

        <p style={{ opacity: 0.6, marginTop: "10px" }}>
          Manage your bookings efficiently
        </p>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            padding: "10px 16px",
            background: "#6366f1",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>

        {/* Stats Cards */}
        <div className="stat-cards" style={{ marginTop: "30px" }}>
          <div className="stat-card">
            <h3>Total Bookings</h3>
            <p>24</p>
          </div>

          <div className="stat-card">
            <h3>Today's Bookings</h3>
            <p>5</p>
          </div>

          <div className="stat-card">
            <h3>Available Rooms</h3>
            <p>12</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;