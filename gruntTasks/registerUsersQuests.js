var async = require('async');
var api = require('../app/libraries/api');
var mysql = require('../app/libraries/mysql').client();
var registerUsersQuests = require('../app/functions/registerUsersQuests');

module.exports = (grunt) => {
  grunt.task.registerTask('register-users-quests', 'Fill quests and usersquests table', function () {
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
          api.usersQuests(page, pageSize)
            .then((usersQuests) => {
              resLength = usersQuests.length;
              page += 1;
              registerUsersQuests(usersQuests, mysql, (err) => callback(err));
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
