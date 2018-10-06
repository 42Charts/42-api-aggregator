const dotenv = require('dotenv');
const moment = require('moment');

const dotenvConfigResult = dotenv.config();

if (dotenvConfigResult.error) {
  throw result.error;
}

module.exports = function (grunt) {
    const date = moment().format('DD-MMM-HH[h]mm-ss[s]');
    require('logfile-grunt')(grunt, { filePath: `./logs/${date}logs.txt` });;
    require('time-grunt')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    });
    grunt.loadTasks('gruntTasks');
};
