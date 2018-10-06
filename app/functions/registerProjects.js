const async = require('async');

const registerProjectCursus = (projectCursus, projectId, db, cb) => {
  if (!projectCursus || !projectCursus.length) {
    return cb();
  }
  let query = 'SELECT ID FROM PROJECTSCURSUS WHERE projectID=? AND cursusID=?';
  let valuesToAdd = [];
  async.each(projectCursus, (cursus, callback) => {
    let values = [projectId, cursus.id];
    db.query(query, values, (err, result) => {
      if (err) {
        return callback(err);
      }
      if (result && result.length) {
        return callback();
      }
      valuesToAdd.push(values);
      callback();
    });
  }, (err) => {
    if (err) {
      return cb(err);
    }
    if (!valuesToAdd.length) {
      return cb();
    }
    query = 'INSERT INTO PROJECTSCURSUS (projectId, cursusID) VALUES ?';
    db.query(query, [valuesToAdd], (error) => {
      cb(error);
    });
  });
};

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
    if (err) {
      cb(err, result);
    }
    async.each(projects, (project, callback) => {
      registerProjectCursus(project.cursus, project.id, db, callback);
    }, (err) => cb(err));
  });
};

module.exports = registerProjects;
