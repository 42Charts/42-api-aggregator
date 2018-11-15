const async = require('async');
const moment = require('moment');

const registerUsersCursus = (usersCursus, db, cb) => {
  async.each(usersCursus, (row, callback) => {
    let endAt = null;
    let beginAt = moment(row.begin_at).format('YYYY-MM-DD HH:mm:ss');
    if (row.end_at) {
      endAt = moment(row.end_at).format('YYYY-MM-DD HH:mm:ss');
    }
    const params = [row.id, row.grade, row.user.id || null, row.cursus.id, row.level, beginAt, endAt];
    db.query('INSERT IGNORE INTO USERSCURSUS (ID, grade, userID, cursusID, level, beginAt, endAt) VALUES ?', [[params]], (err, result) => {
      if (err) {
        return callback(err);
      }
      const params2 = [row.level, row.grade, endAt, row.id];
      db.query('UPDATE USERSCURSUS SET level=?, grade=?, endAt=?, updated=now() WHERE ID=?', params2, (err, result) => {
        if (err) {
          return callback(err);
        }
        callback();
      });
    });

  }, (err) => cb(err));
};

module.exports = registerUsersCursus;
