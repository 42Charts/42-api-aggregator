const LOCATIONS = (
  "LOCATIONS " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY," +
  "host VARCHAR(20)," +
  "campusID INT," +
  "userID INT," +
  "beginAt TIMESTAMP NOT NULL," +
  "endAt TIMESTAMP," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (campusID) REFERENCES campus(ID)," +
  "FOREIGN KEY (userID) REFERENCES users(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = LOCATIONS;
