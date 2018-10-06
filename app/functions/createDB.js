const createDB = (db, callback) => {
  db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback();
  });
};

module.exports = createDB;
