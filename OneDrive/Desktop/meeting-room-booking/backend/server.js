require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");  // 👈 YE IMPORT
const authMiddleware = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected data accessed successfully 🔐",
    user: req.user,
  });
});

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/meeting-room-booking")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});