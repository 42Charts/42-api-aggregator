const registerUsersCoalitions = (usersCoalitions, DBconnection) => {
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
  return DBconnection.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(() => DBconnection.query(query, [values]));
};

module.exports = registerUsersCoalitions;
