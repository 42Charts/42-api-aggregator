const PROJECTS = (
  "PROJECTS " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY," +
  "name VARCHAR(255)," +
  "description VARCHAR(666)," +
  "tier TINYINT," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
  ")"
);

module.exports = PROJECTS;
