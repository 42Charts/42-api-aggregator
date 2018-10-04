const dotenv = require('dotenv');

const dotenvConfigResult = dotenv.config();

if (dotenvConfigResult.error) {
  throw result.error;
}

module.exports = function (grunt) {
    require('time-grunt')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    });
    grunt.loadTasks('gruntTasks');
};
