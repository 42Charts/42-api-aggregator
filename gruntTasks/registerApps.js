var async = require('async');
var api = require('../app/libraries/api');
var mysql = require('../app/libraries/mysql').client();
var registerApps = require('../app/functions/registerApps');

module.exports = (grunt) => {
  grunt.task.registerTask('register-apps', 'Fill apps table', function () {
    const done = this.async();
    mysql.then(connection => {
      const pageSize = 50;
      let page = 1; // intra start page 1 (omegalol)
      let resLength = pageSize;
      async.whilst(
        () => resLength >= pageSize,
        (callback) => {
          api.apps(page, pageSize)
            .then((apps) => {
              resLength = apps.length;
              page += 1;
              registerApps(apps, connection)
                .then(() => callback())
                .catch(err => callback(err));
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
