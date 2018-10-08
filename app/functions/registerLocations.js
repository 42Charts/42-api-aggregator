const async = require('async');
var moment = require('moment');
const parseHost = require('../tools/parseHost');

const registerCluster = (cluster, campusID, db, callback) => {
  let query = 'SELECT ID FROM CLUSTERS WHERE name=? AND campusID=?';
  let values = [cluster.name, campusID];
  db.query(query, values, (err, result) => {
    if (err) {
      return callback(err);
    }
    if (result && result.length) {
      return callback(null, result[0].ID);
    }
    const valuesToAdd = [];
    valuesToAdd.push([ campusID, cluster.name, cluster.number ]);
    let query = 'INSERT IGNORE INTO CLUSTERS (campusID, name, number) VALUES ?';
    db.query(query, [valuesToAdd], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result.insertId);
    });
  });
};

const registerRow = (row, clusterID, db, callback) => {
  let query = 'SELECT ID FROM `ROWS` WHERE name=? AND clusterID=?';
  let values = [row.name, clusterID];
  db.query(query, values, (err, result) => {
    if (err) {
      return callback(err);
    }
    if (result && result.length) {
      return callback(null, result[0].ID);
    }
    const valuesToAdd = [];
    valuesToAdd.push([ clusterID, row.name, row.number ]);
    let query = 'INSERT IGNORE INTO `ROWS` (clusterID, name, number) VALUES ?';
    db.query(query, [valuesToAdd], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result.insertId);
    });
  });
};

const registerHost = (host, rowID, db, callback) => {
  let query = 'SELECT ID FROM HOSTS WHERE name=? AND rowID=?';
  let values = [host.name, rowID];
  db.query(query, values, (err, result) => {
    if (err) {
      return callback(err);
    }
    if (result && result.length) {
      return callback(null, result[0].ID);
    }
    const valuesToAdd = [];
    valuesToAdd.push([ rowID, host.name, host.number ]);
    let query = 'INSERT IGNORE INTO HOSTS (rowID, name, number) VALUES ?';
    db.query(query, [valuesToAdd], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result.insertId);
    });
  });
};

const registerLocations = (locations, db, cb) => {
  const valuesToAdd = [];
  async.eachLimit(locations, 1, (location, callback) => {
    const hostParsed = parseHost(location.host);
    if (!hostParsed) {
      return callback();
    }
    registerCluster(hostParsed.cluster, location.campus_id, db, (err, clusterID) => {
      if (err) {
        return callback(err);
      }
      registerRow(hostParsed.row, clusterID, db, (err, rowID) => {
        if (err) {
          return callback(err);
        }
        registerHost(hostParsed.host, rowID, db, (err, hostID) => {
          if (err) {
            return callback(err);
          }
          const beginAt = new Date(location.begin_at);
          const endAt = new Date(location.end_at);
          const logtimeInSeconds = (endAt.getTime() - beginAt.getTime()) / 1000;
          valuesToAdd.push([
            location.id,
            hostID,
            location.user.id,
            logtimeInSeconds,
            moment(beginAt).format('YYYY-MM-DD HH:mm:ss'),
            moment(endAt).format('YYYY-MM-DD HH:mm:ss'),
          ]);
          callback();
        });
      });
    })
  }, (err) => {
    if (err) {
      return cb(err);
    }
    if (!valuesToAdd.length) {
      return cb();
    }
    let query = 'INSERT IGNORE INTO LOCATIONS (id, hostID, userID, logtimeInSeconds, beginAt, endAt) VALUES ?';
    db.query(query, [valuesToAdd], (err, result) => {
      cb(err, result);
    });
  });
};

module.exports = registerLocations;
