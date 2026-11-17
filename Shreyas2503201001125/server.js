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

app.get('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.status(200).json(student);
});

app.post('/api/students', (req, res) => {
  const { rollNumber, name, branch, semester, email } = req.body;

  if (!rollNumber || !name || !branch || !semester || !email) {
    return res.status(400).json({ message: "All fields are required: rollNumber, name, branch, semester, email" });
  }

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

  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.put('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const { rollNumber, name, branch, semester, email } = req.body;

  if (rollNumber) students[index].rollNumber = rollNumber;
  if (name) students[index].name = name;
  if (branch) students[index].branch = branch;
  if (semester) students[index].semester = Number(semester);
  if (email) students[index].email = email;

  res.status(200).json(students[index]);
});

app.delete('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students.splice(index, 1);
  res.status(200).json({ message: "Student deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
