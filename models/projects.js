const PROJECTS = (
  "PROJECTS " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY," +
  "name VARCHAR(255)," +
  "parentProjectID INT," +
  "tier TINYINT," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (parentProjectID) REFERENCES projects(ID)," +
  "FOREIGN KEY (cursusID) REFERENCES cursus(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = PROJECTS;
