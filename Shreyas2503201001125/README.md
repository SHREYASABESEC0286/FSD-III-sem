# Student Record Management API

**Mid-Term Practical Assessment (SET B) - Full Stack Development (FSD-III)**

A lightweight, beginner-friendly RESTful API built with Node.js and Express.js to manage student records in memory without using external databases.

---

## Student Details
- **Name:** Shreyas
- **Roll Number / Student ID:** 2503201001125

---

## Setup & Installation

1. Open a terminal and navigate to this folder:
   ```bash
   cd Shreyas2503201001125
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Running the Server

Start the application with Node:
```bash
node server.js
```

Or using npm:
```bash
npm start
```

The server will start listening at:
```
http://localhost:3000
```

---

## Initial Data (SET B)

| id | rollNumber | name | branch | semester | email |
|---|---|---|---|---|---|
| 201 | CSE2401 | Aarav Sharma | CSE | 3 | aarav@example.com |
| 202 | ECE2402 | Diya Verma | ECE | 3 | diya@example.com |
| 203 | CSE2403 | Kabir Singh | CSE | 3 | kabir@example.com |

---

## API Endpoints

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/students` | Get all student records | `200 OK` |
| `GET` | `/api/students/filter?branch=<value>` | Filter students by branch (case-insensitive) | `200 OK` |
| `GET` | `/api/students/:id` | Get single student record by numeric ID | `200 OK` / `404 Not Found` |
| `POST` | `/api/students` | Add a new student record (auto-generates unique numeric ID) | `201 Created` / `400 Bad Request` |
| `PUT` | `/api/students/:id` | Update an existing student record | `200 OK` / `404 Not Found` |
| `DELETE` | `/api/students/:id` | Delete a student record by ID | `200 OK` / `404 Not Found` |
| `*` | Any undefined route | Catch-all fallback route | `404 Not Found` |

---

## Sample Request Payloads (From SET B Paper)

### 1. POST `/api/students`
**Request Body (JSON):**
```json
{
  "rollNumber": "IT2404",
  "name": "Meera Gupta",
  "branch": "IT",
  "semester": 3,
  "email": "meera@example.com"
}
```

**Response (`201 Created`):**
```json
{
  "id": 204,
  "rollNumber": "IT2404",
  "name": "Meera Gupta",
  "branch": "IT",
  "semester": 3,
  "email": "meera@example.com"
}
```

### 2. PUT `/api/students/:id` (Example: ID `201`)
**Request Body (JSON):**
```json
{
  "rollNumber": "CSE2401",
  "name": "Aarav Sharma",
  "branch": "CSE",
  "semester": 4,
  "email": "aarav.sharma@example.com"
}
```

**Response (`200 OK`):**
```json
{
  "id": 201,
  "rollNumber": "CSE2401",
  "name": "Aarav Sharma",
  "branch": "CSE",
  "semester": 4,
  "email": "aarav.sharma@example.com"
}
```
