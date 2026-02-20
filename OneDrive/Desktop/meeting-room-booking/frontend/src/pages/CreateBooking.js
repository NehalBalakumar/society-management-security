import React, { useState } from "react";
import Layout from "../components/Layout";

function CreateBooking() {
  const [roomName, setRoomName] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Booking Created (UI only for now)");

    // Later we will connect backend API
    setRoomName("");
    setDate("");
    setTimeSlot("");
  };

  return (
    <Layout>
      <h2>Create Booking</h2>

      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Time Slot (e.g. 10AM - 11AM)"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          required
        />

        <button type="submit">Create Booking</button>
      </form>
    </Layout>
  );
}

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  maxWidth: "400px",
  marginTop: "20px",
};

export default CreateBooking;
