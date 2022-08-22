// Read env variables
require('dotenv').config()

// Connect to local MySQL server
var mysql = require('mysql')

var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });
  
con.connect(function(err) {
  if (err) throw err;
  console.log(`Connected to ${process.env.MYSQL_HOST} as user ${process.env.MYSQL_USERNAME}!`);
});

// Start API
const express = require('express');
const app = express();

// Allows cross origin requests
const cors = require('cors');
app.use(cors({ origin: true }));


app.use(express.json());


app.post('/test', (req, res) => {
  res.status(200).send({ received_body: req.body });
});

// Start the API with Express
const port = process.env.API_PORT || 3333;
app.listen(port, () => console.log(`API available on http://localhost:${port}`));
