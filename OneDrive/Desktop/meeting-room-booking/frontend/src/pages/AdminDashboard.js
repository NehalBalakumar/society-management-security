import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          localStorage.clear();
          navigate("/");
        }

        const data = await res.json();

        // ROLE CHECK
        if (data.role !== "admin") {
          navigate("/dashboard");   // if normal user tries admin page
        }

        setAdminData(data);

      } catch (err) {
        navigate("/");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard-container">

      <div className="dashboard-navbar">
        <h2>Admin Panel</h2>

        <div className="user-info">
          <span>Admin ID: {adminData?.id}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>Admin Access Verified</h3>
          <p>{adminData?.message}</p>
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;