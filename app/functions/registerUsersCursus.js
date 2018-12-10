const moment = require('moment');

const registerUsersCursus = (usersCursus, DBconnection) => {
  const proms = [];
  usersCursus.forEach((row) => {
    let endAt = null;
    let beginAt = moment(row.begin_at).format('YYYY-MM-DD HH:mm:ss');
    if (row.end_at) {
      endAt = moment(row.end_at).format('YYYY-MM-DD HH:mm:ss');
    }
    const params = [row.id, row.grade, row.user.id || null, row.cursus.id, row.level, beginAt, endAt];
    proms.push(
      DBconnection.query('INSERT IGNORE INTO USERSCURSUS (ID, grade, userID, cursusID, level, beginAt, endAt) VALUES ?', [[params]])
        .then(() => {
          const params2 = [row.level, row.grade, endAt, row.id];
          return DBconnection.query('UPDATE USERSCURSUS SET level=?, grade=?, endAt=?, updated=now() WHERE ID=?', params2);
        })
    );
  });
  return Promise.all(proms);
};

module.exports = registerUsersCursus;
