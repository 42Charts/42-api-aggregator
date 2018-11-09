const MESSAGES = (
  "MESSAGES " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY," +
  "title VARCHAR(255)," +
  "description TEXT," +
  "fromUserID INT," +
  "toUserID INT," +
  "readed TINYINT," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (toUserID) REFERENCES USERS(ID)," +
  "FOREIGN KEY (fromUserID) REFERENCES USERS(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = MESSAGES;
