const COALITIONS = (
  "COALITIONS " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY," +
  "name VARCHAR(255)," +
  "score BIGINT," +
  "color VARCHAR(10)," +
  "imageUrl VARCHAR(255)," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
  ") ENGINE = InnoDB;"
);

module.exports = COALITIONS;
