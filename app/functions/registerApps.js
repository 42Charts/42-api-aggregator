const registerApps = (apps, DBconnection) => {
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
  return DBconnection.query(query, [values]);
};

module.exports = registerApps;
