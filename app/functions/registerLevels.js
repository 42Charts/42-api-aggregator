const registerLevels = (levels, DBconnection) => {
  let query = 'INSERT IGNORE INTO LEVELS (cursusID, userID, level) VALUES ?';
  let values = [];
  levels.forEach((level) => {
    values.push([
      level.cursusID,
      level.userID,
      level.level,
    ]);
  });
  return DBconnection.query(query, [values]);
};

module.exports = registerLevels;
