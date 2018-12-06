var api = require('../app/libraries/api');
var mysql = require('../app/libraries/mysql').client();
var registerCoalitions = require('../app/functions/registerCoalitions');

module.exports = (grunt) => {
  grunt.task.registerTask('register-coalitions', 'Fill coalitions table', function () {
    const done = this.async();
    api.getCoalitions()
      .then((coalitions) => {
        mysql.then(connection => {
          registerCoalitions(coalitions, connection)
            .then(() => done())
            .catch(err => done(err));
        }).catch(err => done(err));
      })
      .catch(err => done(err));
  });
};
