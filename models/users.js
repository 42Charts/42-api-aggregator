const USERS = (
  "USERS " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY," +
  "firstname VARCHAR(255)," +
  "lastname VARCHAR(255)," +
  "imageurl VARCHAR(255)," +
  "login VARCHAR(255)," +
  "address VARCHAR(255)," +
  "staff TINYINT," +
  "poolmonth VARCHAR(255)," +
  "poolyear VARCHAR(255)," +
  "level FLOAT," +
  "campusID INT," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (campusID) REFERENCES campus(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = USERS;
