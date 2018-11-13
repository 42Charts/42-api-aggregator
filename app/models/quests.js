const QUESTS = (
  "QUESTS " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY," +
  "name VARCHAR(255)," +
  "kind VARCHAR(50)," +
  "description TEXT," +
  "cursusID INT," +
  "position INT," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (cursusID) REFERENCES CURSUS(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = QUESTS;
