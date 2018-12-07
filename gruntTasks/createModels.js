var mysql = require('../app/libraries/mysql');
var createModels = require('../app/functions/createModels');

module.exports = (grunt) => {
  grunt.task.registerTask('create-models', 'Create Mysql Models/Tables', function () {
    const done = this.async();
    mysql.client()
      .then(createModels)
      .then(() => {
        grunt.log.ok('Models created succefully');
        done();
      })
      .catch(err => done(err))
  });
};
