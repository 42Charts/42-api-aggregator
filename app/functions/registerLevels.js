const registerLevels = (levels, db, cb) => {
  let query = 'INSERT IGNORE INTO LEVELS (cursusID, userID, level) VALUES ?';
  let values = [];
  levels.forEach((level) => {
    values.push([
      level.cursusID,
      level.userID,
      level.level,
    ]);
  });
  db.query(query, [values], (err, result) => {
    cb(err, result);
  });
};

module.exports = registerLevels;
