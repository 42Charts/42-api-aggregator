var async = require('async');
var api = require('../app/libraries/api');
var mysql = require('../app/libraries/mysql');
var registerAchievements = require('../app/functions/registerAchievements');

module.exports = (grunt) => {
  grunt.task.registerTask('register-achievements', 'Fill Achievements table', function () {
    const done = this.async();
    mysql.client()
      .then(connection => {
        const pageSize = 50;
        let page = 1; // intra start page 1 (omegalol)
        let resLength = pageSize;
        async.whilst(
          () => resLength >= pageSize,
          (callback) => {
            api.getAchievements(page, pageSize)
              .then((achievements) => {
                resLength = achievements.length;
                page += 1;
                registerAchievements(achievements, connection)
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
