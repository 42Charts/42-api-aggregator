const MESSAGES = (
  "MESSAGES " +
  "(" +
  "ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
  "title VARCHAR(255)," +
  "message TEXT," +
  "fromUserID INT," +
  "toUserID INT," +
  "readed TINYINT DEFAULT 0," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (toUserID) REFERENCES USERS(ID)," +
  "FOREIGN KEY (fromUserID) REFERENCES USERS(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = MESSAGES;
