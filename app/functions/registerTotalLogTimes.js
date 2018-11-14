var async = require('async');

const registerTotalLogsTimes = (db, cb) => {
  let query = 'SELECT u.ID as id, SUM(l.logtimeInSeconds) as totalLogTimeInSeconds from USERS u INNER JOIN USERSCURSUS uc ON uc.userID=u.ID INNER JOIN LOCATIONS l ON l.userID=u.ID INNER JOIN CURSUS c ON c.ID=uc.cursusID WHERE c.ID=1 GROUP BY u.ID';
  db.query(query, (err, result) => {
    if (err) {
      return cb(err);
    }
    async.each(result, (row, callback) => {
      db.query('UPDATE USERS SET totalLogTime=?, updated=now() WHERE ID=?', [row.totalLogTimeInSeconds, row.id], (err, result) => {
        if (err) {
          return callback(err);
        }
        callback();
      });
    }, (err) => cb(err));
  });
};

module.exports = registerTotalLogsTimes;
