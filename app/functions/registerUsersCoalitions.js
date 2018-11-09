const async = require('async');

const registerUsersCoalitions = (usersCoalitions, db, cb) => {
  let query = 'INSERT IGNORE INTO USERSCOALITIONS (id, userID, coalitionID, score, rank) VALUES ?';
  let values = [];
  usersCoalitions.forEach((userCoalitions) => {
    values.push([
      userCoalitions.id,
      userCoalitions.user_id,
      userCoalitions.coalition_id,
      userCoalitions.score,
      userCoalitions.rank,
    ]);
  });
  db.query('SET FOREIGN_KEY_CHECKS = 0', (err, result) => {
    db.query(query, [values], (err, result) => {
      cb(err, result);
    });
  });
};

module.exports = registerUsersCoalitions;
