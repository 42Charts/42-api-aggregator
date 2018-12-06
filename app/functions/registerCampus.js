const registerCampus = (campus, DBconnection) => {
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
  return DBconnection.query(query, [values]);
};

module.exports = registerCampus;
