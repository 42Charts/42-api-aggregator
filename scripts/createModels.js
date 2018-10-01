const async = require('async');
const models = require('../models');

const createModels = (db, cb) => {
  async.each(models, (model, callback) => {
    db.query(`CREATE TABLE IF NOT EXISTS ${model}`, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback();
    });
  }, (err) => {
    cb(err);
  });
};

module.exports = createModels;
