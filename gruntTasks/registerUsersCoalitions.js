var async = require('async');
var api = require('../app/libraries/api');
var mysql = require('../app/libraries/mysql').client();
var registerUsersCoalitions = require('../app/functions/registerUsersCoalitions');

module.exports = (grunt) => {
  grunt.task.registerTask('register-users-coalitions', 'Fill users coalitions table', function () {
    const done = this.async();
    mysql.connect((error) => {
      if (error) {
        done(error);
        return;
      }
      const pageSize = 50;
      let page = 1; // intra start page 1 (omegalol)
      let resLength = pageSize;
      async.whilst(
        () => resLength >= pageSize,
        (callback) => {
          api.usersCoalitions(page, pageSize)
            .then((usersCoalitions) => {
              resLength = usersCoalitions.length;
              page += 1;
              registerUsersCoalitions(usersCoalitions, mysql, (err) => callback(err));
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
