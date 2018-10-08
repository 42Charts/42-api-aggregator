const async = require('async');

const registerAchievements = (achievements, db, cb) => {
  let query = 'INSERT IGNORE INTO ACHIEVEMENTS (id, name, description, tier, kind, imageUrl, parentID) VALUES ?';
  async.eachLimit(achievements, 1, (achievement, callback) => {
    let values = [];
    let parentID;
    if (achievement.parent) {
      parentID = achievement.parent.id;
    }
    values.push([
      achievement.id,
      achievement.name,
      achievement.description,
      achievement.tier,
      achievement.kind,
      achievement.image,
      parentID,
    ]);
    db.query(query, [values], (err, result) => {
      callback(err, result);
    });
  }, (err) => cb(err));
};

module.exports = registerAchievements;
