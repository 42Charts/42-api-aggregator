var async = require('async');
var api = require('../app/libraries/api');
var mysql = require('../app/libraries/mysql').client();
var registerLocations = require('../app/functions/registerLocations');

module.exports = (grunt) => {
  grunt.loadNpmTasks('grunt-extend-config');
  grunt.loadNpmTasks('grunt-prompt');

  /*grunt.extendConfig({
    prompt: {
      locationsPages: {
        options: {
          questions: [ {
            config: 'pageToStart',
            type: 'input',
            message: 'Page to Start',
          } ],
        }
      },
    },
  });*/

  grunt.task.registerTask('register-locations-specific-pages', 'Fill locations table', function () {
    /*if (!grunt.config('pageToStart')) {
      return grunt.fail.fatal('Page to Start is mandatory');
    }*/

    const done = this.async();
    mysql.connect((error) => {
      if (error) {
        done(error);
        return;
      }
      const pageSize = 50;
      let page = 1;
      let resLength = pageSize;
      async.whilst(
        () => resLength >= pageSize,
        (callback) => {
          api.getLocations(1497806, 4497806, page, pageSize)
            .then((locations) => {
              resLength = locations.length;
              page += 1;
              registerLocations(locations, mysql, (err) => callback(err));
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
          mysql.end();
          done(err);
        }
      );
    });
  });
};
