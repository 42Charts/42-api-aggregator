const ROWS = (
  "`ROWS` " +
  "(" +
  "ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
  "clusterID INT," +
  "zoneID INT," +
  "name VARCHAR(50)," +
  "number INT," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (clusterID) REFERENCES CLUSTERS(ID)," +
  "FOREIGN KEY (zoneID) REFERENCES ZONES(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = ROWS;
