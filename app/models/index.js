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
const usersAchievements = require('./usersAchievements');
const levels = require('./levels');
const usersCoalitions = require('./usersCoalitions');
const apps = require('./apps');
const messages = require('./messages');
const quests = require('./quests');
const usersQuests = require('./usersQuests');
const zones = require('./zones');

const models = [
  achievements,
  cursus, // done
  projects, // done
  projectsCursus, // done
  campus, // done
  coalitions, // done
  clusters, // done
  zones,
  rows, // done
  hosts, // done
  users, // done
  usersProjects, // done
  usersCursus, // done
  usersCampus, // done
  usersTokens, // would be done in api
  usersAchievements,
  locations, // done
  levels,
  usersCoalitions,
  apps,
  messages,
  quests,
  usersQuests,
];

module.exports = models;
