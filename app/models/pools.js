const POOLS = (
  "POOLS " +
  "(" +
  "ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
  "cursusID INT," +
  "campusID INT," +
  "nbUsers INT," +
  "nbStudents INT," +
  "averageLogTime INT, " +
  "averageLogTimeStudents INT, " +
  "year VARCHAR(255)," +
  "month VARCHAR(255), " +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (cursusID) REFERENCES CURSUS(ID)," +
  "FOREIGN KEY (campusID) REFERENCES CAMPUS(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = POOLS;
