const models = require('../models');

const createModels = (DBconnection) => {
  const promises = [];

  models.forEach((model) => {
    promises.push(DBconnection.query(`CREATE TABLE IF NOT EXISTS ${model}`));
  });

  return Promise.all(promises);
};

module.exports = createModels;
