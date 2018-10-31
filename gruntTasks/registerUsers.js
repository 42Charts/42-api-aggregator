var async = require('async');
var api = require('../app/libraries/api');
var mysql = require('../app/libraries/mysql').client();
var registerUser = require('../app/functions/registerUser');

module.exports = (grunt) => {
  grunt.task.registerTask('register-users', 'Fill users table', function () {
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
          api.getUsers(page, pageSize)
            .then((users) => {
              resLength = users.length;
              page += 1;
              async.each(users, (user, cb) => {
                api.getUser(user.id)
                  .then((userInfos) => {
                    registerUser(userInfos, mysql, (err) => {
                      if (err && err.message) {
                        grunt.log.writeln(`WARN >> ${user.id}`['yellow'], err.message);
                      } else if (err) {
                        grunt.log.error(err);
                      }
                      cb();
                    });
                  })
                  .catch(err => {
                    if (err.message) {
                      grunt.log.writeln(`WARN >> ${user.id}`['yellow'], err.message);
                    } else {
                      grunt.log.error(err);
                    }
                    cb();
                  });
              }, () => callback());
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
