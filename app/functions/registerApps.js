const registerApps = (apps, db, cb) => {
  let query = 'INSERT IGNORE INTO APPS (id, name, description, imageUrl, website, public, ownerID, rateLimit) VALUES ?';
  let values = [];
  apps.forEach((app) => {
    values.push([
      app.id,
      app.name,
      app.description,
      app.image,
      app.website,
      app.public,
      app.owner.id,
      app.rate_limit,
    ]);
  });
  db.query(query, [values], (err, result) => {
    cb(err, result);
  });
};

module.exports = registerApps;
