const registerCursus = (cursus, DBconnection) => {
  let query = 'INSERT IGNORE INTO CURSUS (id, name) VALUES ?';
  let values = [];
  cursus.forEach((cur) => {
    values.push([
      cur.id,
      cur.name,
    ]);
  });
  return DBconnection.query(query, [values]);
};

module.exports = registerCursus;
