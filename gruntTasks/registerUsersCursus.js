var async = require('async');
var api = require('../app/libraries/api');
var mysql = require('../app/libraries/mysql');
var registerUsersCursus = require('../app/functions/registerUsersCursus');

module.exports = (grunt) => {
  grunt.task.registerTask('register-users-cursus', 'update users cursus', function () {
    const done = this.async();
    mysql.client()
      .then((connection) => {
        const pageSize = 50;
        let page = 1; // intra start page 1 (omegalol)
        let resLength = pageSize;
        async.whilst(
          () => resLength >= pageSize,
          (callback) => {
            api.usersCursus(page, pageSize)
              .then((usersCursus) => {
                resLength = usersCursus.length;
                page += 1;
                return connection.query('SET FOREIGN_KEY_CHECKS = 0')
                  .then(() => registerUsersCursus(usersCursus, connection));
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
