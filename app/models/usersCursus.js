const USERSCURSUS = (
  "USERSCURSUS " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY," +
  "grade VARCHAR(50)," +
  "userID INT," +
  "cursusID INT," +
  "level INT," +
  "beginAt TIMESTAMP," +
  "endAt TIMESTAMP," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (userID) REFERENCES USERS(ID)," +
  "FOREIGN KEY (cursusID) REFERENCES CURSUS(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = USERSCURSUS;
