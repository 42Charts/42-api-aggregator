const campus = require('./campus');
const projects = require('./projects');
const usersProjects = require('./usersProjects');
const coalitions = require('./coalitions');
const users = require('./users');
const locations = require('./locations');
const clusters = require('./clusters');
const hosts = require('./hosts');

const models = [
  projects,
  usersProjects,
  campus,
  coalitions,
  clusters,
  hosts,
  users,
  locations,
];

module.exports = models;
