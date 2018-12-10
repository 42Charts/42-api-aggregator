const async = require('async');

const registerProjectCursus = (projectCursus, projectId, DBconnection) => new Promise((resolve, reject) => {
  if (!projectCursus || !projectCursus.length) {
    return resolve();
  }
  let query = 'SELECT ID FROM PROJECTSCURSUS WHERE projectID=? AND cursusID=?';
  let valuesToAdd = [];
  async.each(projectCursus, (cursus, callback) => {
    let values = [projectId, cursus.id];
    DBconnection.query(query, values)
      .then(([ result ]) => {
        if (result && result.length) {
          return callback();
        }
        valuesToAdd.push(values);
      })
      .catch(err => callback(err));
  }, (err) => {
    if (err) {
      return reject(err);
    }
    if (!valuesToAdd.length) {
      return resolve();
    }
    query = 'INSERT INTO PROJECTSCURSUS (projectId, cursusID) VALUES ?';
    DBconnection.query(query, [valuesToAdd])
      .then(() => resolve())
      .catch(err => reject(err));
  });
});

const registerProjects = (projects, DBconnection) => new Promise((resolve, reject) => {
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
  DBconnection.query(query, [values])
    .then(() => {
      const proms = [];
      projects.forEach((project) => {
        proms.push(registerProjectCursus(project.cursus, project.id, DBconnection));
      });
      return Promise.all(proms);
    })
    .then(() => resolve())
    .catch(err => reject(err));
});

module.exports = registerProjects;
