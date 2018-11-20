const async = require('async');
var moment = require('moment');
const parseHost = require('../tools/parseHost');

const registerZone = (zone, campusID, clusterID, db, callback) => {
  if (!zone.name) {
    return callback();
  }
  let query = 'SELECT ID FROM ZONES WHERE name=? AND ((campusID=? AND campusID IS NOT NULL) OR (clusterID=? AND clusterID IS NOT NULL))';
  let values = [zone.name, campusID, clusterID];
  db.query(query, values, (err, result) => {
    if (err) {
      return callback(err);
    }
    if (result && result.length) {
      return callback(null, result[0].ID);
    }
    const valuesToAdd = [];
    if (campusID && clusterID) {
      campusID = null;
    }
    valuesToAdd.push([ clusterID, campusID, zone.name, zone.number ]);
    let query = 'INSERT IGNORE INTO ZONES (clusterID, campusID, name, number) VALUES ?';
    db.query(query, [valuesToAdd], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result.insertId);
    });
  });
};

const registerCluster = (cluster, campusID, db, callback) => {
  if (!cluster.name) {
    return callback();
  }
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

const registerRow = (row, clusterID, zoneID, db, callback) => {
  let query = 'SELECT ID FROM `ROWS` WHERE name=? AND ((clusterID=? AND clusterID IS NOT NULL) OR (zoneID=? AND zoneID IS NOT NULL))';
  let values = [row.name, clusterID, zoneID];
  db.query(query, values, (err, result) => {
    if (err) {
      return callback(err);
    }
    if (result && result.length) {
      return callback(null, result[0].ID);
    }
    const valuesToAdd = [];
    if (clusterID && zoneID) {
      clusterID = null;
    }
    valuesToAdd.push([ clusterID, zoneID, row.name, row.number ]);
    let query = 'INSERT IGNORE INTO `ROWS` (clusterID, zoneID, name, number) VALUES ?';
    db.query(query, [valuesToAdd], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result.insertId);
    });
  });
};

const registerHost = (hostNotParsed, host, rowID, db, callback) => {
  let query = 'SELECT ID FROM HOSTS WHERE name=? AND rowID=? AND fullname=?';
  let values = [host.name, rowID, hostNotParsed];
  db.query(query, values, (err, result) => {
    if (err) {
      return callback(err);
    }
    if (result && result.length) {
      return callback(null, result[0].ID);
    }
    const valuesToAdd = [];
    valuesToAdd.push([ rowID, host.name, hostNotParsed, host.number ]);
    let query = 'INSERT IGNORE INTO HOSTS (rowID, name, fullname, number) VALUES ?';
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
    db.query('SET FOREIGN_KEY_CHECKS = 0', (err, result) => {
      registerCluster(hostParsed.cluster, location.campus_id, db, (err, clusterID) => {
        if (err) {
          return callback(err);
        }
        registerZone(hostParsed.zone, location.campus_id, clusterID, db, (err, zoneID) => {
          if (err) {
            return callback(err);
          }
          registerRow(hostParsed.row, clusterID, zoneID, db, (err, rowID) => {
            if (err) {
              return callback(err);
            }
            registerHost(hostParsed.hostNotParsed, hostParsed.host, rowID, db, (err, hostID) => {
              if (err) {
                return callback(err);
              }
              const beginAt = new Date(location.begin_at);
              const endAt = new Date(location.end_at);
              const logtimeInSeconds = (endAt.getTime() - beginAt.getTime()) / 1000;
              if (!location.user) {
                return callback();
              }
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
        });
      });
    });
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
