const mysql = require('../mysql');

const createDB = () => {
  mysql.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, function (err, result) {
    if (err) {
      throw err;
    }
  });
};

module.exports = createDB;
