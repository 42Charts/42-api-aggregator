const registerProjects = (projects, db, cb) => {
  let query = 'INSERT IGNORE INTO PROJECTS (id, name, parentProjectID, tier) VALUES ?';
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
      project.tier,
    ]);
  });
  db.query(query, [values], (err, result) => {
    cb(err, result);
  });
};

module.exports = registerProjects;
