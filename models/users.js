const USERS = (
  "USERS " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY," +
  "firstname VARCHAR(255)," +
  "lastname VARCHAR(255)," +
  "imageUrl VARCHAR(255)," +
  "login VARCHAR(255)," +
  "address VARCHAR(255)," +
  "staff TINYINT," +
  "poolMonth VARCHAR(255)," +
  "poolYear VARCHAR(255)," +
  "level FLOAT," +
  "campusID INT," +
  "hostPrefered INT," +
  "clusterPrefered INT," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (campusID) REFERENCES campus(ID)," +
  "FOREIGN KEY (hostPrefered) REFERENCES hosts(ID)," +
  "FOREIGN KEY (clusterPrefered) REFERENCES clusters(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = USERS;
