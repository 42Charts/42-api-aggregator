var async = require('async');
var api = require('../app/libraries/api');
var mysql = require('../app/libraries/mysql');
var registerProjects = require('../app/functions/registerProjects');

module.exports = (grunt) => {
  grunt.task.registerTask('register-projects', 'Fill projects table', function () {
    const done = this.async();
    mysql.client()
      .then((connection) => {
        const pageSize = 50;
        let page = 1; // intra start page 1 (omegalol)
        let resLength = pageSize;
        async.whilst(
          () => resLength >= pageSize,
          (callback) => {
            api.getProjects(page, pageSize)
              .then((projects) => {
                resLength = projects.length;
                page += 1;
                registerProjects(projects, connection)
                  .then(() => {
                    const proms = [];
                    projects.forEach((project) => {
                      if (project.children && project.children.length) {
                        proms.push(
                          api.getSubProjects(project.id)
                            .then((subprojects) => registerProjects(subprojects, connection))
                        );
                      }
                    });
                    return Promise.all(proms);
                  })
                  .then(() => callback())
                  .catch(err => {
                    if (err.message) {
                      grunt.log.writeln('WARN >>'['yellow'], err.message);
                    } else {
                      grunt.log.writeln('WARN >>'['yellow'], err.message);
                    }
                    callback();
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
            connection.end();
            done(err);
          }
        );
      })
      .catch(err => done(err));
    });
};
