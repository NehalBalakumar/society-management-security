const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Connection Error", err));

app.get("/", (req, res) => {
  res.json({
    message: "Society SaaS Backend Running",
    status: "success"
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
