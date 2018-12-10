const global = (ranks, DBconnection) => {
  let query = 'UPDATE USERS SET allRank=?, updated=now() WHERE ID=?';
  const proms = [];
  ranks.forEach((rank) => {
    const values = [
      rank.rank,
      rank.userID,
    ];
    proms.push(DBconnection.query(query, values));
  });
  return Promise.all(proms);
};

const byPromo = (ranks, DBconnection) => {
  let query = 'UPDATE USERS SET promoRank=?, updated=now() WHERE ID=?';
  const proms = [];
  ranks.forEach((rank) => {
    const values = [
      rank.rank,
      rank.userID,
    ];
    proms.push(DBconnection.query(query, values));
  });
  return Promise.all(proms);
};

module.exports = { global, byPromo };
