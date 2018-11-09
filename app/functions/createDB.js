const createDB = (db, callback) => {
  db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME} character SET UTF8mb4 COLLATE utf8mb4_unicode_ci`, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback();
  });
};

module.exports = createDB;
