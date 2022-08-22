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

// API
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Create password
const crypto = require('crypto');
const prompt = require("prompt-sync")({ sigint: true });
var fs = require('fs');

if (process.env.API_PASSWORD === undefined) {
  const getHashedPassword = (password) => {
      const sha256 = crypto.createHash('sha256');
      const hash = sha256.update(password).digest('base64');
      return hash;
  }
  const setApiPassword = getHashedPassword(prompt("Enter a random seed to generate your password: "))
  console.log(`Your API password is ${setApiPassword}`);
  fs.appendFile('.env', `\nAPI_PASSWORD="${setApiPassword}"`, function (err) {
    if (err) {
      console.log(err)
    }
  })
}

// Allows cross origin requests
const cors = require('cors');
app.use(cors({ origin: true }));

// Middleware
app.use(express.json());
app.use(cookieParser());

app.post('/test', (req, res) => {
  res.status(200).send({ received_body: req.body });
});

// Start the API with Express
const port = process.env.API_PORT || 3333;
app.listen(port, () => console.log(`API available on http://localhost:${port}`));
