const USERSQUESTS = (
  "USERSQUESTS " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY," +
  "questID INT," +
  "userID INT," +
  "percent INT," +
  "advancement VARCHAR(255)," +
  "validated TIMESTAMP," +
  "end TIMESTAMP," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (questID) REFERENCES QUESTS(ID)," +
  "FOREIGN KEY (userID) REFERENCES USERS(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = USERSQUESTS;
