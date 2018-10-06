/*
  A user may be in multiples campus
*/

const USERSCAMPUS = (
  "USERSCAMPUS " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY UNIQUE," +
  "userID INT," +
  "campusID INT," +
  "isPrimary TINYINT," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (userID) REFERENCES USERS(ID)," +
  "FOREIGN KEY (campusID) REFERENCES CAMPUS(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = USERSCAMPUS;
