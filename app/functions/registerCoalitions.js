const registerCoalitions = (coalitions, DBconnection) => {
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
  return DBconnection.query(query, [values]);
};

module.exports = registerCoalitions;
