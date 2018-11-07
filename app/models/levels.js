/*
  keep track of olds LEVELS (updated every week)
*/

const LEVELS = (
  "LEVELS " +
  "(" +
  "ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
  "cursusID INT," +
  "userID INT," +
  "level DOUBLE," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (cursusID) REFERENCES CURSUS(ID)," +
  "FOREIGN KEY (userID) REFERENCES USERS(ID)" +
  ") ENGINE = InnoDB CHARACTER SET=utf8;"
);

module.exports = LEVELS;
