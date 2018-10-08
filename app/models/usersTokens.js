const USERSTOKENS = (
  "USERSTOKENS " +
  "(" +
  "ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE," +
  "accessToken VARCHAR(64) NOT NULL UNIQUE," +
  "tokenType VARCHAR(15)," +
  "scope VARCHAR(15)," +
  "userID INT," +
  "created TIMESTAMP NOT NULL," +
  "FOREIGN KEY (userID) REFERENCES users(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = USERSTOKENS;
