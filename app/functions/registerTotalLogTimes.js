const registerTotalLogsTimes = (DBconnection) => {
  let query = 'SELECT u.ID as id, SUM(l.logtimeInSeconds) as totalLogTimeInSeconds from USERS u INNER JOIN USERSCURSUS uc ON uc.userID=u.ID ' +
  'INNER JOIN LOCATIONS l ON l.userID=u.ID INNER JOIN CURSUS c ON c.ID=uc.cursusID WHERE c.ID=1 GROUP BY u.ID';
  return DBconnection.query(query)
    .then(([ result ]) => {
      const proms = [];
      result.forEach((row) => {
        proms.push(
          DBconnection.query('UPDATE USERS SET totalLogTime=?, updated=now() WHERE ID=?', [row.totalLogTimeInSeconds, row.id])
        );
      });
      return Promise.all(proms);
    });
};

module.exports = registerTotalLogsTimes;
