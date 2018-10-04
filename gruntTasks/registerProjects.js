var async = require('async');
var api = require('../libraries/api');
var mysql = require('../libraries/mysql').client();
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
      let page = 1; // intra start page 1 (omegalol)
      let resLength = pageSize;
      async.whilst(
        () => resLength >= pageSize,
        (callback) => {
          api.getProjects(page, pageSize)
            .then((projects) => {
              resLength = projects.length;
              page += 1;
              registerProjects(projects, mysql, (err) => {
                if (err) {
                  return callback(err);
                }
                async.each(projects, (project, cb) => {
                  if (!project.children || !project.children.length) {
                    return cb();
                  }
                  api.getSubProjects(project.id)
                    .then((subprojects) => {
                      registerProjects(subprojects, mysql, (err) => cb(err));
                    })
                    .catch(err => {
                      if (err.message) {
                        grunt.log.writeln('WARN >>'['yellow'], err.message);
                      } else {
                        grunt.log.error(err);
                      }
                      cb();
                    });
                }, (err) => callback(err));
              });
            })
            .catch(err => {
              if (err.message) {
                grunt.log.writeln('WARN >>'['yellow'], err.message);
              } else {
                grunt.log.writeln('WARN >>'['yellow'], err.message);
              }
              callback();
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
