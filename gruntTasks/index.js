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
              { name: 'Register simple Models (campus, coalitions, cursus, projects, achievements)' },
              { name: 'Register complex Models (Users, locations)' },
              { name: 'Register users and start to specific page' },
              { name: 'Register specific User' },
              { name: 'Register locations and start to specific page' },
              { name: 'Create DB' },
              { name: 'Create Models' },
              { name: 'Register campus' },
              { name: 'Register coalitions' },
              { name: 'Register cursus' },
              { name: 'Register Projects' },
              { name: 'Register Achievements' },
              { name: 'Register Users' },
              { name: 'Register Locations' },
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
              case 'Register simple Models (campus, coalitions, cursus, projects, achievements)':
                grunt.task.run('register-simple-models');
                break;
              case 'Register complex Models (Users, locations)':
                grunt.task.run('register-complex-models');
                break;
              case 'Register users and start to specific page':
                grunt.task.run('get-specific-users-from-page');
                break;
              case 'Register specific User':
                grunt.task.run('get-specific-user');
                break;
              case 'Register locations and start to specific page':
                grunt.task.run('get-specific-locations-from-page');
                break;
              case 'Register campus':
                grunt.task.run('register-campus');
                break;
              case 'Register coalitions':
                grunt.task.run('register-coalitions');
                break;
              case 'Register cursus':
                grunt.task.run('register-cursus');
                break;
              case 'Register Projects':
                grunt.task.run('register-projects');
                break;
              case 'Register Achievements':
                grunt.task.run('register-achievements');
                break;
              case 'Register Users':
                grunt.task.run('register-users');
                break;
              case 'Register Locations':
                grunt.task.run('register-locations');
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

  grunt.registerTask('register-simple-models', 'Register simple Models (campus, coalitions, cursus, projects)', [
    'register-campus',
    'register-coalitions',
    'register-cursus',
    'register-projects',
    'register-achievements',
  ]);

  grunt.registerTask('get-specific-user', 'Get specific user', [
    'prompt:userSpecific',
    'register-specific-user',
  ]);

  grunt.registerTask('get-specific-users-from-page', 'Get specific users from page', [
    'prompt:usersPages',
    'register-users-specific-pages',
  ]);

  grunt.registerTask('get-specific-locations-from-page', 'Get specific locations from page', [
    'prompt:locationsPages',
    'register-locations-specific-pages',
  ]);

  grunt.registerTask('register-complex-models', 'Register complex Models (Users, locations)', [
    'register-users',
    'register-locations',
  ]);

  grunt.registerTask('init-database', 'Create database with models', [
      'create-db',
      'create-models',
  ]);

  grunt.registerTask('default', [
    'prompt:selectTask',
  ]);
};
