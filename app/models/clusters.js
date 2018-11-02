const CLUSTERS = (
  "CLUSTERS " +
  "(" +
  "ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
  "campusID INT," +
  "name VARCHAR(50)," +
  "surname VARCHAR(255)," +
  "number INT," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (campusID) REFERENCES CAMPUS(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = CLUSTERS;
