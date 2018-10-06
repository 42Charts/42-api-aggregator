/*
  A project may be in multiples cursus
*/

const PROJECTSCURSUS = (
  "PROJECTSCURSUS " +
  "(" +
  "ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
  "projectID INT," +
  "cursusID INT," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (projectID) REFERENCES PROJECTS(ID)," +
  "FOREIGN KEY (cursusID) REFERENCES CURSUS(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = PROJECTSCURSUS;
