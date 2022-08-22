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