var mysql = require('../app/libraries/mysql');
var registerTotalLogTimes = require('../app/functions/registerTotalLogTimes');

module.exports = (grunt) => {
  grunt.task.registerTask('register-total-logtime', 'register total logs times', function () {
    const done = this.async();
    mysql.client()
      .then(connection => registerTotalLogTimes(connection))
      .then(() => done())
      .catch(err => done(err));
  });
};
