var mysql = require('../app/libraries/mysql').client();
var createModels = require('../app/functions/createModels');

module.exports = (grunt) => {
  grunt.task.registerTask('create-models', 'Create Mysql Models/Tables', function () {
    const done = this.async();
    mysql.connect((error) => {
      if (error) {
        done(error);
        return;
      }
      createModels(mysql, (err) => {
        if (err) {
          mysql.end();
          done(err);
          return;
        }
        mysql.end();
        grunt.log.ok('Models created succefully');
        done();
      });
    });
  });
};
