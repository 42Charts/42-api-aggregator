const campus = require('./campus');
const projects = require('./projects');
const usersProjects = require('./usersProjects');
const coalitions = require('./coalitions');
const users = require('./users');
const locations = require('./locations');

const models = [
  projects,
  usersProjects,
  campus,
  coalitions,
  users,
  locations,
];

module.exports = models;
