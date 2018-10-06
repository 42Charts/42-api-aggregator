const CAMPUS = (
  "CAMPUS " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY," +
  "userCount BIGINT," +
  "name VARCHAR(100)," +
  "country VARCHAR(60)," +
  "address VARCHAR(255)," +
  "timeZone VARCHAR(100)," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
  ") ENGINE = InnoDB;"
);

module.exports = CAMPUS;
