var api = require('../app/libraries/api');
var mysql = require('../app/libraries/mysql').client();
var registerCampus = require('../app/functions/registerCampus');

module.exports = (grunt) => {
  grunt.task.registerTask('register-campus', 'Fill campus table', function () {
    const done = this.async();
    api.getCampus()
      .then((campus) => {
        mysql.then(connection => {
          registerCampus(campus, connection)
            .then(() => done())
            .catch(err => done(err));
        }).catch(err => done(err));
      })
      .catch(err => done(err));
  });
};
