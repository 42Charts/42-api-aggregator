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

const models = [
  cursus, // done
  projects, // done
  projectsCursus, // done
  campus, // done
  coalitions, // done
  clusters,
  rows,
  hosts,
  users, // done
  usersProjects, // done
  usersCursus, // done
  usersCampus, // done
  locations, // @TODO after users (in it do hosts/rows/clusters)
];

module.exports = models;

/*
@TODO put some data on user to avoid re-calc (will be refresh every days)
- logtime this week/day/year/from the start

@TODO create state table to avoid re-calc (will be refresh every days)
- average logtime this week/day/year/from the start
- most used cluster/row/host
*/
