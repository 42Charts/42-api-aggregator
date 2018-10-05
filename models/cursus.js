const CURSUS = (
  "CURSUS " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY," +
  "name VARCHAR(255)," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
  ") ENGINE = InnoDB;"
);

module.exports = CURSUS;
