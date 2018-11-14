var async = require('async');
var moment = require('moment');
var mysql = require('../app/libraries/mysql').client();
var registerRanks = require('../app/functions/registerRanks');

module.exports = (grunt) => {
  grunt.task.registerTask('update-ranks', 'Update ranks on user', function () {
    const done = this.async();
    mysql.connect((error) => {
      if (error) {
        done(error);
        return;
      }
      mysql.query('SELECT l.userID, l.level, l.beginAt FROM USERSCURSUS l INNER JOIN USERS u ON u.ID=l.userID WHERE l.cursusID=1', (err, result) => {
        if (err) {
          done(err);
          return;
        }
        async.each(result, (user, callback) => {
          let resultWithRanks;
          mysql.query('SELECT COUNT(*) as rank FROM USERS u INNER JOIN USERSCURSUS uc ON uc.userID=u.ID WHERE uc.cursusID=1 AND uc.level>?', [user.level], (err, result) => {
            if (err) {
              return callback(err);
            }
            resultWithRanks = [{
              rank: result[0].rank + 1,
              userID: user.userID,
            }];
            registerRanks.global(resultWithRanks, mysql, (err) => {
              if (err) {
                return callback(err);
              }
              const yearBottom = moment(user.beginAt).startOf('year').format('YYYY-MM-DDTHH:mm:ss.SSS');
              const yearTop = moment(user.beginAt).startOf('year').add(1, 'year').format('YYYY-MM-DDTHH:mm:ss.SSS');
              mysql.query('SELECT COUNT(*) as rank FROM USERS u INNER JOIN USERSCURSUS uc ON uc.userID=u.ID WHERE uc.cursusID=1 AND uc.level>? AND uc.beginAt>=? AND uc.beginAt<?', [user.level, yearBottom, yearTop], (err, result) => {
                if (err) {
                  return callback(err);
                }
                resultWithRanks = [{
                  rank: result[0].rank + 1,
                  userID: user.userID,
                }];
                registerRanks.byPromo(resultWithRanks, mysql, (err) => {
                  if (err) {
                    return callback(err);
                  }
                  callback();
                });
              });
            });
          });
        }, (err) => done(err));
      });
    });
  });
};
