const registerCampus = (campus, db, cb) => {
  let query = 'INSERT IGNORE INTO CAMPUS (id, userCount, name, country, address, timeZone) VALUES ?';
  let values = [];
  campus.forEach((camp) => {
    values.push([
      camp.id,
      camp.users_count,
      camp.name,
      camp.country,
      camp.address,
      camp.time_zone,
    ]);
  });
  db.query(query, [values], (err, result) => {
    cb(err, result);
  });
};

module.exports = registerCampus;
