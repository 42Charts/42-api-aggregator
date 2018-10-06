const LOCATIONS = (
  "LOCATIONS " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY," +
  "hostID INT," +
  "userID INT," +
  "beginAt TIMESTAMP NOT NULL," +
  "endAt TIMESTAMP," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (hostID) REFERENCES hosts(ID)," +
  "FOREIGN KEY (userID) REFERENCES users(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = LOCATIONS;
