var async = require('async');
var api = require('../app/libraries/api');
var mysql = require('../app/libraries/mysql');
var registerUser = require('../app/functions/registerUser');

module.exports = (grunt) => {
  grunt.task.registerTask('register-users', 'Fill users table', function () {
    const done = this.async();
    mysql.client()
      .then((connection) => {
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
                const proms = [];
                users.forEach((user) => {
                  proms.push(
                    api.getUser(user.id)
                      .then((userInfos) => registerUser(userInfos, connection))
                  );
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
          },
          (err) => done(err)
        );
      })
      .catch(err => done(err));
  });
};
