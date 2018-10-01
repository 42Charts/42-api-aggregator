const inquirer = require('inquirer');

module.exports = (grunt) => {
  grunt.loadNpmTasks('grunt-extend-config');
  grunt.loadNpmTasks('grunt-prompt');

  grunt.extendConfig({
    prompt: {
      selectTask: {
        options: {
          questions: [ {
            config: 'selectTask',
            type: 'list',
            message: 'Choose a task to run',
            default: 'Init database (create db & models)',
            choices: [
              { name: 'Init database (create db & models)' },
              { name: 'Create DB' },
              { name: 'Create Models' },
              { name: 'Exit' },
            ]
          } ],
          then: (results, done) => {
            switch (results.selectTask) {
              case 'Init database (create db & models)':
                grunt.task.run('init-database');
                break;
              case 'Create DB':
                grunt.task.run('create-db');
                break;
              case 'Create Models':
                grunt.task.run('create-models');
                break;
              default:
                break;
            }
            done();
            return true;
          }
        }
      },
    },
  });

  grunt.registerTask('init-database', 'Create database with models', [
      'create-db',
      'create-models',
  ]);

  grunt.registerTask('default', [
    'prompt:selectTask',
  ]);
};
