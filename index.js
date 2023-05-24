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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
