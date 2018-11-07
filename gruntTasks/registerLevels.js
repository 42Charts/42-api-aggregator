var async = require('async');
var mysql = require('../app/libraries/mysql').client();
var registerLevels = require('../app/functions/registerLevels');

module.exports = (grunt) => {
  grunt.task.registerTask('register-levels', 'Fill levels table', function () {
    const done = this.async();
    mysql.connect((error) => {
      if (error) {
        done(error);
        return;
      }
      mysql.query('SELECT * FROM USERSCURSUS', (err, result) => {
        if (err) {
          done(err);
          return;
        }
        registerLevels(result, mysql, (err) => {
          done(err);
        });
      });
    });
  });
};
