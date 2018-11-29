const POOLS = (
  "POOLS " +
  "(" +
  "ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
  "cursusID INT," +
  "campusID INT," +
  "nbUsers INT," +
  "nbStudents INT," +
  "beginAt TIMESTAMP NOT NULL," +
  "endAt TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (cursusID) REFERENCES CURSUS(ID)," +
  "FOREIGN KEY (campusID) REFERENCES CAMPUS(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = POOLS;
