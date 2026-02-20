import React from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

// 📊 Chart imports (NEW — DO NOT REMOVE)
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function UserDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // 📊 Fake analytics data (NEW)
  const meetingData = [
    { day: "Mon", meetings: 4 },
    { day: "Tue", meetings: 6 },
    { day: "Wed", meetings: 3 },
    { day: "Thu", meetings: 8 },
    { day: "Fri", meetings: 5 },
  ];

  const meetings = [
    {
      room: "Conference Room",
      time: "3:00 PM",
      status: "available",
    },
    {
      room: "Board Room",
      time: "Tomorrow 11:00 AM",
      status: "pending",
    },
    {
      room: "Hall 1",
      time: "5:00 PM",
      status: "unavailable",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Welcome, {user?.name}</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Analytics Card */}
        <div className="dashboard-card analytics-card">
          <h3>Analytics</h3>
          <p>You have 5 meetings this week.</p>
        </div>

        {/* 📈 Weekly Activity Chart (NEW PREMIUM) */}
        <div className="dashboard-card chart-card">
          <h3>Weekly Activity</h3>

          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <LineChart data={meetingData}>
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="meetings"
                  stroke="#6366f1"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="dashboard-card">
          <h3>Upcoming Meetings</h3>

          {meetings.map((meeting, index) => (
            <div key={index} className="meeting-item">
              <span>
                {meeting.room} — {meeting.time}
              </span>

              <span className={`status ${meeting.status}`}>
                {meeting.status === "available" && "Available"}
                {meeting.status === "pending" && "Pending"}
                {meeting.status === "unavailable" && "Not Available"}
              </span>
            </div>
          ))}
        </div>

        {/* Book Room */}
        <div className="dashboard-card">
          <h3>Book Room</h3>
          <p>Find and book available meeting rooms.</p>
        </div>

        {/* Meeting History */}
        <div className="dashboard-card">
          <h3>Meeting History</h3>
          <p>View your past meetings and details.</p>
        </div>

        {/* Settings */}
        <div className="dashboard-card">
          <h3>Settings</h3>
          <p>Update your profile and preferences.</p>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
