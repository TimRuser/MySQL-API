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

// Query the database
function queryDatabase(req, res) {
  con.query(req.body.query, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400)
      res.send(err);
    }
    res.status(200);
    res.send(result);
  });
}

// API
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Create username
const prompt = require("prompt-sync")({ sigint: true });
var fs = require('fs');

if(process.env.API_USERNAME === undefined) {
  const apiUsername = prompt("Select a username for the API: ")
  fs.appendFile('.env', `\nAPI_USERNAME="${apiUsername}"`, function (err) {
    if (err) {
      console.log(err)
    }
  })
}

// Create password
const crypto = require('crypto');

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

const basicAuth = require('express-basic-auth')

app.use(basicAuth({
    users: { [process.env.API_USERNAME]: `${process.env.API_PASSWORD}` }
}));

app.post('/api', (req, res) => {
  queryDatabase(req, res);
  console.log(req)
});

// Start the API with Express
const port = process.env.API_PORT || 3333;
app.listen(port, () => console.log(`API available on http://localhost:${port}/api`));
