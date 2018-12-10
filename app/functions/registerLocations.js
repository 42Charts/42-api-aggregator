const async = require('async');
var moment = require('moment');
const parseHost = require('../tools/parseHost');

const registerZone = (zone, campusID, clusterID, DBconnection) => new Promise((resolve, reject) => {
  if (!zone.name) {
    return resolve();
  }
  let query = 'SELECT ID FROM ZONES WHERE name=? AND ((campusID=? AND campusID IS NOT NULL) OR (clusterID=? AND clusterID IS NOT NULL))';
  let values = [zone.name, campusID, clusterID];
  DBconnection.query(query, values)
    .then(([ result ]) => {
      if (result && result.length) {
        return resolve(clusterID, result[0].ID);
      }
      const valuesToAdd = [];
      if (campusID && clusterID) {
        campusID = null;
      }
      valuesToAdd.push([ clusterID, campusID, zone.name, zone.number ]);
      let query = 'INSERT IGNORE INTO ZONES (clusterID, campusID, name, number) VALUES ?';
      DBconnection.query(query, [valuesToAdd])
        .then((result) => resolve(clusterID, result.insertId))
        .catch(err => reject(err));
    })
    .catch(err => reject(err));
});

const registerCluster = (cluster, campusID, DBconnection) => new Promise((resolve, reject) => {
  if (!cluster.name) {
    return resolve();
  }
  let query = 'SELECT ID FROM CLUSTERS WHERE name=? AND campusID=?';
  let values = [cluster.name, campusID];
  DBconnection.query(query, values)
    .then(([ result ]) => {
      if (result && result.length) {
        return resolve(result[0].ID);
      }
      const valuesToAdd = [];
      valuesToAdd.push([ campusID, cluster.name, cluster.number ]);
      let query = 'INSERT IGNORE INTO CLUSTERS (campusID, name, number) VALUES ?';
      DBconnection.query(query, [valuesToAdd])
        .then((result) => resolve(result.insertId))
        .catch(err => reject(err));
    })
    .catch(err => reject(err));
});

const registerRow = (row, clusterID, zoneID, DBconnection) => new Promise((resolve, reject) => {
  let query = 'SELECT ID FROM `ROWS` WHERE name=? AND ((clusterID=? AND clusterID IS NOT NULL) OR (zoneID=? AND zoneID IS NOT NULL))';
  let values = [row.name, clusterID, zoneID];
  DBconnection.query(query, values)
    .then(([ result ]) => {
      if (result && result.length) {
        return resolve(result[0].ID);
      }
      const valuesToAdd = [];
      if (clusterID && zoneID) {
        clusterID = null;
      }
      valuesToAdd.push([ clusterID, zoneID, row.name, row.number ]);
      let query = 'INSERT IGNORE INTO `ROWS` (clusterID, zoneID, name, number) VALUES ?';
      DBconnection.query(query, [valuesToAdd])
        .then((result) => resolve(result.insertId))
        .catch(err => reject(err));
    })
    .catch(err => reject(err));
});

const registerHost = (hostNotParsed, host, rowID, DBconnection) => new Promise((resolve, reject) => {
  let query = 'SELECT ID FROM HOSTS WHERE name=? AND rowID=? AND fullname=?';
  let values = [host.name, rowID, hostNotParsed];
  DBconnection.query(query, values)
    .then(([ result ]) => {
      if (result && result.length) {
        return resolve(result[0].ID);
      }
      const valuesToAdd = [];
      valuesToAdd.push([ rowID, host.name, hostNotParsed, host.number ]);
      let query = 'INSERT IGNORE INTO HOSTS (rowID, name, fullname, number) VALUES ?';
      db.query(query, [valuesToAdd])
        .then((result) => resolve(result.insertId))
        .catch(err => reject(err));
    })
    .catch(err => reject(err));
});

const registerLocations = (locations, DBconnection) => new Promise((resolve, reject) => {
  const valuesToAdd = [];
  async.eachLimit(locations, 1, (location, callback) => {
    const hostParsed = parseHost(location.host);
    if (!hostParsed) {
      return callback();
    }
    DBconnection.query('SET FOREIGN_KEY_CHECKS = 0')
      .then(() => registerCluster(hostParsed.cluster, location.campus_id, DBconnection))
      .then((clusterID) => registerZone(hostParsed.zone, location.campus_id, clusterID, DBconnection))
      .then((clusterID, zoneID) => registerRow(hostParsed.row, clusterID, zoneID, DBconnection))
      .then((rowID) => registerHost(hostParsed.hostNotParsed, hostParsed.host, rowID, DBconnection))
      .then((hostID) => {
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
      }).catch(err => callback(err));
  }, (err) => {
    if (err) {
      return reject(err);
    }
    if (!valuesToAdd.length) {
      return resolve();
    }
    let query = 'INSERT IGNORE INTO LOCATIONS (id, hostID, userID, logtimeInSeconds, beginAt, endAt) VALUES ?';
    DBconnection.query(query, [valuesToAdd])
      .then(() => resolve())
      .catch(err => reject(err));
  });
});

module.exports = registerLocations;
