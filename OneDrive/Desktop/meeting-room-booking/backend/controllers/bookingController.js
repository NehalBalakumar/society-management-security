const db = require("../config/db");

/**
 * CREATE BOOKING
 * POST /api/bookings/create
 */
const createBooking = (req, res) => {
  try {
    const user_id = req.user.id; // authMiddleware se aata hai
    const { room_id, date, start_time, end_time } = req.body;

    if (!room_id || !date || !start_time || !end_time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Time validation
    if (start_time >= end_time) {
      return res
        .status(400)
        .json({ message: "Start time must be before end time" });
    }

    const query = `
      INSERT INTO bookings (user_id, room_id, date, start_time, end_time, status)
      VALUES (?, ?, ?, ?, ?, 'PENDING')
    `;

    db.query(
      query,
      [user_id, room_id, date, start_time, end_time],
      (err, result) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ message: "Error creating booking" });
        }

        res.status(201).json({
          message: "Booking created successfully",
          booking_id: result.insertId,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET LOGGED-IN USER BOOKINGS
 * GET /api/bookings/my
 */
const getMyBookings = (req, res) => {
  try {
    const user_id = req.user.id;

    const query = `
      SELECT id, room_id, date, start_time, end_time, status
      FROM bookings
      WHERE user_id = ?
      ORDER BY date DESC
    `;

    db.query(query, [user_id], (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Error fetching bookings" });
      }

      res.json(results);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET ALL BOOKINGS (ADMIN)
 * GET /api/bookings
 */
const getAllBookings = (req, res) => {
  const query = `
    SELECT b.*, u.email
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    ORDER BY b.date DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Error fetching all bookings" });
    }

    res.json(results);
  });
};

/**
 * APPROVE / REJECT BOOKING (ADMIN)
 * PUT /api/bookings/:id/status
 */
const updateBookingStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["APPROVED", "REJECTED"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const query = `
    UPDATE bookings
    SET status = ?
    WHERE id = ?
  `;

  db.query(query, [status, id], (err) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Error updating booking status" });
    }

    res.json({ message: "Booking status updated" });
  });
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
};
