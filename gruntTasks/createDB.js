var mysql = require('../app/libraries/mysql').clientWithoutDB();
var createDB = require('../app/functions/createDB');

module.exports = (grunt) => {
  grunt.task.registerTask('create-db', 'Create Mysql Database', function () {
    const done = this.async();
    mysql.then(connection => {
      createDB(connection)
        .then(() => {
          connection.end();
          grunt.log.ok('Database created succefully');
          done();
        }).catch(err => {
          connection.end();
          done(err);
        });
    })
    .catch(err => done(err));
  });
};
