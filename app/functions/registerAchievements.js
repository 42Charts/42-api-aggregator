const registerAchievements = (achievements, DBconnection) => {
  const values = [];
  let query = 'INSERT IGNORE INTO ACHIEVEMENTS (id, name, description, tier, kind, imageUrl, parentID) VALUES ?';

  achievements.forEach((achievement) => {
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
  });
  return DBconnection.query(query, [values]);
};

module.exports = registerAchievements;
