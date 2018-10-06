const HOSTS = (
  "HOSTS " +
  "(" +
  "ID INT NOT NULL PRIMARY KEY," +
  "clusterID INT," +
  "name VARCHAR(255) UNIQUE," +
  "updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "created TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
  "FOREIGN KEY (clusterID) REFERENCES clusters(ID)" +
  ") ENGINE = InnoDB;"
);

module.exports = HOSTS;
