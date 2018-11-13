const moment = require('moment');

const registerUsersQuests = (usersQuests, db, cb) => {
  let query = 'INSERT IGNORE INTO QUESTS (id, name, kind, description, cursusID, position) VALUES ?';
  let values = [];
  usersQuests.forEach((userQuests) => {
    values.push([
      userQuests.quest.id,
      userQuests.quest.name,
      userQuests.quest.kind,
      userQuests.quest.description,
      userQuests.quest.cursus_id,
      userQuests.quest.position
    ]);
  });
  db.query('SET FOREIGN_KEY_CHECKS = 0', (err, result) => {
    db.query(query, [values], (err, result) => {
      query = 'INSERT IGNORE INTO USERSQUESTS (id, questID, userID, percent, advancement, validated, end) VALUES ?';
      values = [];
      let validated = null;
      let end = null;
      let userId = null;
      usersQuests.forEach((userQuests) => {
        if (userQuests.validated_at) {
          validated = moment(userQuests.validated_at).format('YYYY-MM-DD HH:mm:ss');
        }
        if (userQuests.end_at) {
          end = moment(userQuests.end_at).format('YYYY-MM-DD HH:mm:ss');
        }
        if (userQuests.user && userQuests.user.id) {
          userId = userQuests.user.id;
        }
        values.push([
          userQuests.id,
          userQuests.quest_id,
          userId,
          userQuests.prct,
          userQuests.advancement,
          validated,
          end,
        ]);
      });
      db.query(query, [values], (err, result) => {
        cb(err, result);
      });
    });
  });
};

module.exports = registerUsersQuests;
