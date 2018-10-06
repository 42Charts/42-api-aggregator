const CLUSTERS = (
  "CLUSTERS " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY," +
  "campusID INT," +
  "name VARCHAR(255)," +
  "surnname VARCHAR(255)," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (campusID) REFERENCES campus(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = CLUSTERS;
