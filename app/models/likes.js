const LIKES = (
  "LIKES " +
  "(" +
  "ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
  "userID INT," +
  "appID INT," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (userID) REFERENCES USERS(ID)," +
  "FOREIGN KEY (appID) REFERENCES APPS(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = LIKES;
