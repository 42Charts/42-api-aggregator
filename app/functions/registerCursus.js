const registerCursus = (cursus, db, cb) => {
  let query = 'INSERT IGNORE INTO CURSUS (id, name) VALUES ?';
  let values = [];
  cursus.forEach((cur) => {
    values.push([
      cur.id,
      cur.name,
    ]);
  });
  db.query(query, [values], (err, result) => {
    cb(err, result);
  });
};

module.exports = registerCursus;
