const HOSTS = (
  "HOSTS " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY," +
  "rowID INT," +
  "name VARCHAR(255)," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (rowID) REFERENCES rows(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = HOSTS;
