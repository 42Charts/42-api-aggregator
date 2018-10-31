const ACHIEVEMENTS = (
  "ACHIEVEMENTS " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY," +
  "name VARCHAR(100)," +
  "description VARCHAR(255)," +
  "tier VARCHAR(50)," +
  "kind VARCHAR(50)," +
  "imageUrl VARCHAR(255)," +
  "parentID INT," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (parentID) REFERENCES ACHIEVEMENTS(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = ACHIEVEMENTS;
