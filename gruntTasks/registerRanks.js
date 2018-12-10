var async = require('async');
var moment = require('moment');
var mysql = require('../app/libraries/mysql');
var registerRanks = require('../app/functions/registerRanks');

module.exports = (grunt) => {
  grunt.task.registerTask('update-ranks', 'Update ranks on user', function () {
    const done = this.async();
    mysql.client()
      .then((connection) => {
        connection.query('SELECT l.userID, l.level, l.beginAt FROM USERSCURSUS l INNER JOIN USERS u ON u.ID=l.userID WHERE l.cursusID=1')
          .then(([ users ]) => {
            const proms = [];
            users.forEach((user) => {
              let resultWithRanks;
              proms.push(
                connection.query('SELECT COUNT(*) as rank FROM USERS u INNER JOIN USERSCURSUS uc ON uc.userID=u.ID WHERE uc.cursusID=1 AND uc.level>?', [user.level])
                  .then(([ result ]) => {
                    resultWithRanks = [{
                      rank: result[0].rank + 1,
                      userID: user.userID,
                    }];
                    return registerRanks.global(resultWithRanks, connection);
                  })
                  .then(() => {
                    const yearBottom = moment(user.beginAt).startOf('year').format('YYYY-MM-DDTHH:mm:ss.SSS');
                    const yearTop = moment(user.beginAt).startOf('year').add(1, 'year').format('YYYY-MM-DDTHH:mm:ss.SSS');
                    return connection.query('SELECT COUNT(*) as rank FROM USERS u INNER JOIN USERSCURSUS uc ON uc.userID=u.ID WHERE uc.cursusID=1 AND uc.level>? AND uc.beginAt>=? AND uc.beginAt<?', [user.level, yearBottom, yearTop]);
                  })
                  .then(([ result ]) => {
                    resultWithRanks = [{
                      rank: result[0].rank + 1,
                      userID: user.userID,
                    }];
                    return registerRanks.byPromo(resultWithRanks, connection);
                  })
              );
            });
            return Promise.all(proms);
          })
          .then(() => done())
          .catch(err => done(err));
      })
      .catch(err => done(err));
  });
};
