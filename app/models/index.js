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
const rows = require('./rows');
const usersTokens = require('./usersTokens');
const achievements = require('./achievements');

const models = [
  achievements,
  cursus, // done
  projects, // done
  projectsCursus, // done
  campus, // done
  coalitions, // done
  clusters, // done
  rows, // done
  hosts, // done
  users, // done
  usersProjects, // done
  usersCursus, // done
  usersCampus, // done
  usersTokens, // would be done in api
  locations, // done
];

module.exports = models;
