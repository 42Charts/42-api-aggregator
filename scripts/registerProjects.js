const registerProjects = (projects, db, cb) => {
  let query = 'INSERT IGNORE INTO PROJECTS (id, name, description, tier) VALUES ?';
  let values = [];
  projects.forEach((project) => {
    values.push([
      project.id,
      project.name,
      project.description,
      project.tier,
    ]);
  });
  db.query(query, [values], (err, result) => {
    cb(err, result);
  });
};

module.exports = registerProjects;
