var async = require('async');
var api = require('../app/libraries/api');
var mysql = require('../app/libraries/mysql');
var registerUsersCoalitions = require('../app/functions/registerUsersCoalitions');

module.exports = (grunt) => {
  grunt.task.registerTask('register-users-coalitions', 'Fill users coalitions table', function () {
    const done = this.async();
    mysql.client()
      .then((connection) => {
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
                return registerUsersCoalitions(usersCoalitions, connection);
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
          },
          (err) => done(err)
        );
      })
      .catch(err => done(err));
  });
};
