var api = require('../libraries/api');
var mysql = require('../libraries/mysql').client;
var registerCampus = require('../scripts/registerCampus');

module.exports = (grunt) => {
  grunt.task.registerTask('register-campus', 'Fill campus table', function () {
    const done = this.async();
    api.getCampus()
      .then((campus) => {
        mysql.connect((error) => {
          if (error) {
            mysql.end();
            done(error);
            return;
          }
          registerCampus(campus, mysql, (err) => {
            mysql.end();
            done(err);
          });
        });
      })
      .catch(err => {
        mysql.end();
        done(err);
      });
  });
};
