var async = require('async');
var api = require('../app/libraries/api');
var mysql = require('../app/libraries/mysql');
var registerUser = require('../app/functions/registerUser');

module.exports = (grunt) => {
  grunt.loadNpmTasks('grunt-extend-config');
  grunt.loadNpmTasks('grunt-prompt');

  grunt.extendConfig({
    prompt: {
      userSpecific: {
        options: {
          questions: [ {
            config: 'userId',
            type: 'input',
            message: 'USER ID',
          } ],
        }
      },
    },
  });

  grunt.task.registerTask('register-specific-user', 'Fill specific user', function () {
    if (!grunt.config('userId')) {
      return grunt.fail.fatal('User ID is mandatory');
    }
    const done = this.async();
    mysql.client()
      .then((connection) => {
        api.getUser(grunt.config('userId'))
          .then((userInfos) => registerUser(userInfos, connection))
          .then(() => done())
          .catch(err => {
            if (err.message) {
              grunt.log.writeln('WARN >>'['yellow'], err.message);
            } else {
              grunt.log.error(err);
            }
            done();
          });
      })
      .catch(err => done(err));
  });
};
