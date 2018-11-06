const USERS = (
  "USERS " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY," +
  "firstname VARCHAR(50)," +
  "lastname VARCHAR(50)," +
  "displayname VARCHAR(100)," +
  "imageUrl VARCHAR(255)," +
  "url VARCHAR(255)," +
  "login VARCHAR(20)," +
  "staff TINYINT," +
  "poolMonth VARCHAR(15)," +
  "poolYear VARCHAR(6)," +
  "promoRank INT," +
  "allRank INT," +
  "hostPrefered INT," +
  "rowPrefered INT," +
  "clusterPrefered INT," +
  "active TINYINT," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (hostPrefered) REFERENCES HOSTS(ID)," +
  "FOREIGN KEY (rowPrefered) REFERENCES `ROWS`(ID)," +
  "FOREIGN KEY (clusterPrefered) REFERENCES CLUSTERS(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = USERS;
