const LOCATIONS = (
  "LOCATIONS " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY," +
  "hostID INT," +
  "userID INT," +
  "logtimeInSeconds INT," +
  "beginAt TIMESTAMP NOT NULL," +
  "endAt TIMESTAMP," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (hostID) REFERENCES HOSTS(ID)," +
  "FOREIGN KEY (userID) REFERENCES USERS(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = LOCATIONS;
