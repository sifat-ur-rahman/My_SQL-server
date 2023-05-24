const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config()

app.use(cors())
const app = express();
const port = 3001;

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.LOCALHOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.Database_Name
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Create Employee
app.post('/employees', (req, res) => {
    const { name, email, phone,address } = req.body;
    const employee = { name, email, phone,address };
  
    db.query('INSERT INTO employees SET ?', employee, (err, result) => {
      if (err) throw err;
      console.log('Employee created');
      res.send('Employee created');
    });
  });

//   List Employees with pagination

app.get('/employees', (req, res) => {
    const page = req.query.page || 1; // Get the page number from the query parameters
    const limit = 10; // Number of employees per page
    const offset = (page - 1) * limit;
  
    db.query('SELECT * FROM employees LIMIT ?, ?', [offset, limit], (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  

//   Update Employee

app.get('/employees/:id', (req, res) => {
    const employeeId = req.params.id;
  
    db.query('SELECT * FROM employees WHERE id = ?', employeeId, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });


//   Delete Employee

app.delete('/employees/:id', (req, res) => {
    const employeeId = req.params.id;
  
    db.query('DELETE FROM employees WHERE id = ?', employeeId, (err, result) => {
      if (err) throw err;
      console.log('Employee deleted');
      res.send('Employee deleted');
    });
  });
  
//   Get Employee

app.get('/employees/:id', (req, res) => {
    const employeeId = req.params.id;
  
    db.query('SELECT * FROM employees WHERE id = ?', employeeId, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
  
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
