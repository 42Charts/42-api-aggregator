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
  "hostPrefered INT," +
  "clusterPrefered INT," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (hostPrefered) REFERENCES hosts(ID)," +
  "FOREIGN KEY (clusterPrefered) REFERENCES clusters(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = USERS;
