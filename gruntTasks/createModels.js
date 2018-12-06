var mysql = require('../app/libraries/mysql').client();
var createModels = require('../app/functions/createModels');

module.exports = (grunt) => {
  grunt.task.registerTask('create-models', 'Create Mysql Models/Tables', function () {
    const done = this.async();
    mysql.then(connection => {
      createModels(connection)
        .then(() => {
          connection.end();
          grunt.log.ok('Models created succefully');
          done();
        }).catch(err => {
          connection.end();
          done(err);
        });
    })
    .catch(err => done(err));
  });
};
