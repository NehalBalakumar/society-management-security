# Meeting Room Booking System (Backend)

A backend application for managing meeting room bookings in an organization. 
The system allows users to book rooms, prevents time-slot conflicts, and enables admins to approve or reject bookings.

---

## Features

- User authentication using JWT
- Role-based authorization (Admin / User)
- Create meeting room bookings
- Prevent booking conflicts for the same room and time slot
- Admin approval or rejection of bookings
- View bookings based on status
- RESTful API architecture

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- JWT (JSON Web Token)
- bcrypt.js

---

## Project Structure



---

## API Endpoints

### User APIs
- `POST /api/users/register` – Register a new user
- `POST /api/users/login` – Login and get JWT token

### Booking APIs
- `POST /api/bookings/create` – Create a booking (User)
- `PUT /api/bookings/status` – Approve/Reject booking (Admin)
- `GET /api/bookings` – View bookings (Authenticated users)

---

## Security

- JWT-based authentication
- Role-based access control for admin-only operations
- Protected routes using middleware

---

## How to Run the Project

```bash
cd backend
npm install
node server.js


---

## WHY WE’RE DOING THIS FIRST
Recruiter usually:
- Opens GitHub
- Reads README
- Decides in **30 seconds** whether you’re shortlisted

This README = **professional + real-world**

---

## YOUR TASK NOW (DO THIS)
1️. Create `README.md`  
2️. Paste the content exactly  
3️. Save file  

Then reply:
**“README done”**

Next step:
**Resume bullets + interview answers (very powerful)**