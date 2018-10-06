const campus = require('./campus');
const projects = require('./projects');
const usersProjects = require('./usersProjects');
const coalitions = require('./coalitions');
const users = require('./users');
const locations = require('./locations');
const clusters = require('./clusters');
const hosts = require('./hosts');
const cursus = require('./cursus');
const usersCursus = require('./usersCursus');
const projectsCursus = require('./projectsCursus');
const usersCampus = require('./usersCampus');

const models = [
  cursus,
  projects,
  projectsCursus,
  campus,
  coalitions,
  clusters,
  hosts,
  users,
  usersProjects,
  locations,
  usersCursus,
  usersCampus,
];

module.exports = models;
