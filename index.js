const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

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

// Create Employee:
app.post('/employees', (req, res) => {
    const { name, email, phone,address } = req.body;
    const employee = { name, email, phone,address };
  
    db.query('INSERT INTO employees SET ?', employee, (err, result) => {
      if (err) throw err;
      console.log('Employee created');
      res.send('Employee created');
    });
  });

  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
