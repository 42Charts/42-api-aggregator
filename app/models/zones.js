const ZONES = (
  "ZONES " +
  "(" +
  "ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
  "clusterID INT," +
  "campusID INT," +
  "name VARCHAR(50)," +
  "number INT," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (clusterID) REFERENCES CLUSTERS(ID)," +
  "FOREIGN KEY (campusID) REFERENCES CAMPUS(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = ZONES;
