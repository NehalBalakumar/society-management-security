import { useEffect, useState } from "react";
import axios from "axios";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/bookings/my",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setBookings(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch bookings");
      }
    };

    fetchBookings();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>My Bookings</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {bookings.length === 0 && <p>No bookings found.</p>}

      {bookings.map((b) => (
        <div key={b.id} style={{ marginBottom: 10 }}>
          Room: {b.room_name} | {b.date} | {b.start_time} - {b.end_time} |{" "}
          {b.status}
        </div>
      ))}
    </div>
  );
}
