const CAMPUS = (
  "CAMPUS " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY," +
  "userCount BIGINT," +
  "name VARCHAR(255)," +
  "endpoint VARCHAR(255)," +
  "timeZone VARCHAR(255)," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
  ")"
);

module.exports = CAMPUS;
