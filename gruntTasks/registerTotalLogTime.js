var mysql = require('../app/libraries/mysql').client();
var registerTotalLogTimes = require('../app/functions/registerTotalLogTimes');

module.exports = (grunt) => {
  grunt.task.registerTask('register-total-logtime', 'register total logs times', function () {
    const done = this.async();
    mysql.connect((error) => {
      if (error) {
        done(error);
        return;
      }
      registerTotalLogTimes(mysql, (err) => {
        if (err) {
          mysql.end();
          done(err);
          return;
        }
        mysql.end();
        grunt.log.ok('ok');
        done();
      });
    });
  });
};
