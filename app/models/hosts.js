const HOSTS = (
  "HOSTS " +
  "(" +
  "ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
  "rowID INT," +
  "name VARCHAR(50)," +
  "number INT," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (rowID) REFERENCES `rows`(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = HOSTS;
