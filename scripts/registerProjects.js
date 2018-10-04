const registerProjects = (projects, db, cb) => {
  let query = 'INSERT IGNORE INTO PROJECTS (id, name, parentProjectID, cursusID, tier) VALUES ?';
  let values = [];
  projects.forEach((project) => {
    let parent = null;
    if (project.parent) {
      parent = project.parent.id;
    }
    values.push([
      project.id,
      project.name,
      parent,
      project.cursus[0].id,
      project.tier,
    ]);
  });
  db.query(query, [values], (err, result) => {
    cb(err, result);
  });
};

module.exports = registerProjects;
