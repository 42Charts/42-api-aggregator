var mysql = require('../mysql').clientWithoutDB;
var createDB = require('../scripts/createDB');

module.exports = (grunt) => {
  grunt.task.registerTask('create-db', 'Create Mysql Database', function () {
    const done = this.async();
    mysql.connect((error) => {
      if (error) {
        done(error);
        return;
      }
      createDB(mysql, (err) => {
        if (err) {
          mysql.end();
          done(err);
          return;
        }
        mysql.end();
        grunt.log.ok('Database created succefully');
        done();
      });
    });
  });
};
