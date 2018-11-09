const APPS = (
  "APPS " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY," +
  "name VARCHAR(100)," +
  "description VARCHAR(255)," +
  "imageUrl VARCHAR(255)," +
  "website VARCHAR(255)," +
  "public TINYINT," +
  "ownerID INT," +
  "rateLimit INT," +
  "awesome TINYINT DEFAULT 0," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (ownerID) REFERENCES USERS(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = APPS;
