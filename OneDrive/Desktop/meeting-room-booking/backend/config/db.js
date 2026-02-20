const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Neh@#2003",
    database: "meeting_room_booking",
});

db.connect((err) => {
    if (err){
        console.error("Database connection failed:", err);
    } else{
        console.log("MySQL Connected");
    }
});

module.exports = db;