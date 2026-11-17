// Import Express framework
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// In-memory data store with Set B initial student records
let students = [
  {
    id: 201,
    rollNumber: "CSE2401",
    name: "Aarav Sharma",
    branch: "CSE",
    semester: 3,
    email: "aarav@example.com"
  },
  {
    id: 202,
    rollNumber: "ECE2402",
    name: "Diya Verma",
    branch: "ECE",
    semester: 3,
    email: "diya@example.com"
  },
  {
    id: 203,
    rollNumber: "CSE2403",
    name: "Kabir Singh",
    branch: "CSE",
    semester: 3,
    email: "kabir@example.com"
  }
];

// 1. GET /api/students - Return all student records
app.get('/api/students', (req, res) => {
  res.status(200).json(students);
});

// 2. GET /api/students/filter?branch=value - Filter students by branch
// IMPORTANT: This route must be placed BEFORE '/api/students/:id'.
// Express evaluates routes sequentially. If '/:id' came first,
// a request to '/api/students/filter' would interpret 'filter' as an ':id' parameter.
app.get('/api/students/filter', (req, res) => {
  const branch = req.query.branch;
  if (!branch) {
    return res.status(200).json(students);
  }
  // Case-insensitive filtering using standard .filter()
  const result = students.filter(student => student.branch.toLowerCase() === branch.toLowerCase());
  res.status(200).json(result);
});

// 3. GET /api/students/:id - Return a single student by numeric ID
app.get('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  // Find student using standard .find()
  const student = students.find(s => s.id === id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.status(200).json(student);
});

// 4. POST /api/students - Add a new student record
app.post('/api/students', (req, res) => {
  const { rollNumber, name, branch, semester, email } = req.body;

  // Basic validation using simple if/else
  if (!rollNumber || !name || !branch || !semester || !email) {
    return res.status(400).json({ message: "All fields are required: rollNumber, name, branch, semester, email" });
  }

  // Auto-generate unique numeric ID
  let newId = 201;
  for (let i = 0; i < students.length; i++) {
    if (students[i].id >= newId) {
      newId = students[i].id + 1;
    }
  }

  const newStudent = {
    id: newId,
    rollNumber: rollNumber,
    name: name,
    branch: branch,
    semester: Number(semester),
    email: email
  };

  // Push new student into array
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// 5. PUT /api/students/:id - Update an existing student record
app.put('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  // Find student index using standard .findIndex()
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const { rollNumber, name, branch, semester, email } = req.body;

  // Update provided fields
  if (rollNumber) students[index].rollNumber = rollNumber;
  if (name) students[index].name = name;
  if (branch) students[index].branch = branch;
  if (semester) students[index].semester = Number(semester);
  if (email) students[index].email = email;

  res.status(200).json(students[index]);
});

// 6. DELETE /api/students/:id - Delete a student record by ID
app.delete('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  // Find student index using standard .findIndex()
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  // Remove student from array using standard .splice()
  students.splice(index, 1);
  res.status(200).json({ message: "Student deleted successfully" });
});

// 7. Fallback route for undefined paths
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
