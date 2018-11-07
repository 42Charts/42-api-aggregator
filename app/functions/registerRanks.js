async = require('async');

const global = (ranks, db, cb) => {
  let query = 'UPDATE USERS SET allRank=?, updated=now() WHERE ID=?';
  async.each(ranks, (rank, callback) => {
    values = [
      rank.rank,
      rank.userID,
    ];
    db.query(query, values, (err, result) => {
      callback(err, result);
    });
  }, (err) => {
    cb(err);
  });
};

const byPromo = (ranks, db, cb) => {
  let query = 'UPDATE USERS SET promoRank=?, updated=now() WHERE ID=?';
  async.eachLimit(ranks, 5, (rank, callback) => {
    values = [
      rank.rank,
      rank.userID,
    ];
    db.query(query, values, (err, result) => {
      callback(err, result);
    });
  }, (err) => {
    cb(err);
  });
};

module.exports = { global, byPromo };
