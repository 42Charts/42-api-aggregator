var async = require('async');
var api = require('../libraries/api');
var mysql = require('../libraries/mysql').client;
var registerProjects = require('../scripts/registerProjects');

module.exports = (grunt) => {
  grunt.task.registerTask('register-projects', 'Fill projects table', function () {
    const done = this.async();
    mysql.connect((error) => {
      if (error) {
        done(error);
        return;
      }
      const pageSize = 30;
      let page = 0;
      let resLength = 30;
      async.whilst(
        () => resLength >= pageSize,
        (callback) => {
          api.getProjects(page, pageSize)
            .then((projects) => {
              /* @TODO subprojects */
              resLength = projects.length;
              page += 1;
              registerProjects(projects, mysql, (err) => {
                callback(err);
              });
            })
            .catch(err => {
              callback(err);
            });
        },
        (err) => {
          mysql.end();
          done(err);
        }
      );
    });
  });
};
