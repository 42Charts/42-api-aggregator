const ROWS = (
  "ROWS " +
  "(" +
  "ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
  "clusterID INT," +
  "name VARCHAR(255)," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (clusterID) REFERENCES clusters(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = ROWS;
