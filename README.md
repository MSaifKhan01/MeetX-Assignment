# 📘 MeetX API

A simple backend API built with **Node.js**, **Express**, and **MongoDB** that allows users to register, log in, view activities, and book them.

---

## 🚀 Features

* User Authentication (JWT-based)
* Activity Management
* Booking System
* Duplicate Prevention
* Proper Validation & Error Handling

---

## 🔧 Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JSON Web Tokens (JWT)
* bcrypt
* dotenv

---

## 📂 Folder Structure

```
├── controllers
│   ├── user.js
│   ├── activity.js
│   └── booking.js
├── middleware
│   └── auth.js
├── models
│   ├── user.js
│   ├── activity.js
│   └── booking.js
├── routes
│   ├── user.js
│   ├── activity.js
│   └── booking.js
├── config
│   └── db.js
├── .env
├── index.js
└── package.json
```

---

## 📌 Routes Overview

### 🔐 Auth Routes - `/user`

* `POST /register` → User registration
* `POST /login` → User login, returns JWT

### 🏃 Activity Routes - `/activities`

* `GET /` → Get all activities
* `POST /add` → Add a new activity *(🔐 Auth required)*

### 📅 Booking Routes - `/bookings`

* `POST /:activityId` → Book an activity *(🔐 Auth required)*
* `GET /my` → Get user's bookings *(🔐 Auth required)*

---

## 🛡️ Middleware: `Auth`

* Verifies JWT from Authorization header
* Sets `req.userID` for use in protected routes
* Handles missing or invalid tokens

---

## 📥 Install & Run

```bash
git clone <repo-url>
cd meetx-backend
npm install

# Set up your .env file
PORT=5000
tokenSecretSign=your_jwt_secret
MONGO_URL=your_mongo_uri

npm start
```

---

## ✅ Example Response

### Login

```json
{
  "msg": "Login successful",
  "token": "<JWT>",
  "user": {
    "_id": "...",
    "email": "...",
    "phone": "..."
  }
}
```



## 📬 Postman Collection

Import the full Postman collection with all route examples for testing.

(*[ Postman collection link here](https://documenter.getpostman.com/view/23226414/2sB2j7cpKo)*)

---


