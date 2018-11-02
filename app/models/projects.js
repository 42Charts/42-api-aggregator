const PROJECTS = (
  "PROJECTS " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY," +
  "name VARCHAR(255)," +
  "parentProjectID INT," +
  "tier TINYINT," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (parentProjectID) REFERENCES PROJECTS(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = PROJECTS;
