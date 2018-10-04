var api = require('../libraries/api');
var mysql = require('../libraries/mysql').client();
var registerCursus = require('../scripts/registerCursus');

module.exports = (grunt) => {
  grunt.task.registerTask('register-cursus', 'Fill cursus table', function () {
    const done = this.async();
    api.getCursus()
      .then((cursus) => {
        mysql.connect((error) => {
          if (error) {
            done(error);
            return;
          }
          registerCursus(cursus, mysql, (err) => {
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
