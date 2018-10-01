const USERSPROJECTS = (
  "USERSPROJECTS " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY," +
  "projectID INT," +
  "status VARCHAR(50)," +
  "validated TINYINT," +
  "finalMark INT," +
  "markedAt TIMESTAMP," +
  "retries INT," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (projectID) REFERENCES projects(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = USERSPROJECTS;
