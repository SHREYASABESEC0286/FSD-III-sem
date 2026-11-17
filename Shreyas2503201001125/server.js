const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

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

app.get('/api/students', (req, res) => {
  res.status(200).json(students);
});

app.get('/api/students/filter', (req, res) => {
  const branch = req.query.branch;
  if (!branch) {
    return res.status(200).json(students);
  }
  const result = students.filter(student => student.branch.toLowerCase() === branch.toLowerCase());
  res.status(200).json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
