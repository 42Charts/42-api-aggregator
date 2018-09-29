var mysql = require('mysql');
var CONFIG = require('../config');

var connection = mysql.createConnection({
  host: CONFIG.mysql.host,
  user: CONFIG.mysql.user,
  password: CONFIG.mysql.password,
});

connection.connect(function (error) {
  if (error) {
    throw error;
  }
  connection.query(`CREATE DATABASE IF NOT EXISTS ${CONFIG.mysql.database}`, function (err, result) {
    if (err) {
      throw err;
    }
  });
});

module.exports = connection;
