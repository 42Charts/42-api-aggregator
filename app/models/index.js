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
  cursus, // done
  projects, // done
  projectsCursus, // done
  campus, // done
  coalitions, // done
  clusters,
  hosts,
  users, // done
  usersProjects, // done
  usersCursus, // done
  usersCampus, // done
  locations, // @TODO after users (in it do hosts/clusters)
];

module.exports = models;
