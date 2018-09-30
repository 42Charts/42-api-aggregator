const async = require('async');
const mysql = require('../mysql');
const models = require('../models');

const createModels = () => {
  async.each(models, (model, callback) => {
    mysql.query(`CREATE TABLE IF NOT EXISTS ${model}`, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback();
    });
  }, (err) => {
    console.log(err);
  });
};

module.exports = createModels;
