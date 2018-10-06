var api = require('../app/libraries/api');
var mysql = require('../app/libraries/mysql').client();
var registerCoalitions = require('../app/functions/registerCoalitions');

module.exports = (grunt) => {
  grunt.task.registerTask('register-coalitions', 'Fill coalitions table', function () {
    const done = this.async();
    api.getCoalitions()
      .then((coalitions) => {
        mysql.connect((error) => {
          if (error) {
            mysql.end();
            done(error);
            return;
          }
          registerCoalitions(coalitions, mysql, (err) => {
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
