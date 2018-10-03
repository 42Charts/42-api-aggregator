const registerCoalitions = (coalitions, db, cb) => {
  let query = 'INSERT IGNORE INTO COALITIONS (id, name, score, color, imageUrl) VALUES ?';
  let values = [];
  coalitions.forEach((coalition) => {
    values.push([
      coalition.id,
      coalition.name,
      coalition.score,
      coalition.color,
      coalition.image_url,
    ]);
  });
  db.query(query, [values], (err, result) => {
    cb(err, result);
  });
};

module.exports = registerCoalitions;
