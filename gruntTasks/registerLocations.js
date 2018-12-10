var async = require('async');
var api = require('../app/libraries/api');
var mysql = require('../app/libraries/mysql');
var registerLocations = require('../app/functions/registerLocations');

module.exports = (grunt) => {
  grunt.task.registerTask('register-locations', 'Fill locations table', function () {
    const done = this.async();
    mysql.client()
      .then((connection) => {
        const pageSize = 50;
        let page = 1;
        let resLength = pageSize;
        async.whilst(
          () => resLength >= pageSize,
          (callback) => {
            api.getLocations(page, pageSize)
              .then((locations) => {
                resLength = locations.length;
                page += 1;
                registerLocations(locations, connection)
                  .then(() => callback())
                  .catch(err => callback(err));
              })
              .catch(err => {
                if (err.message) {
                  grunt.log.writeln('WARN >>'['yellow'], err.message);
                } else {
                  grunt.log.writeln('WARN >>'['yellow'], err.message);
                }
                callback();
              });
          },
          (err) => {
            connection.end();
            done(err);
          }
        );
      }).catch(err => done(err));
  });
};
