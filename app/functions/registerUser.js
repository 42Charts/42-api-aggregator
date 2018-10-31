var moment = require('moment');

const registerUserAchievements = (usersAchievements, db, userId, cb) => {
  if (!usersAchievements || !usersAchievements.length) {
    return cb();
  }
  let query = 'INSERT IGNORE INTO USERSACHIEVEMENTS (userID, achievementID) VALUES ?';
  let values = [];
  usersAchievements.forEach((usersAchievement) => {
    values.push([
      userId,
      usersAchievement.id,
    ]);
  });
  db.query(query, [values], (err, result) => {
    cb(err, result);
  });
};

const registerUserCursus = (cursusUsers, db, cb) => {
  if (!cursusUsers || !cursusUsers.length) {
    return cb();
  }
  let query = 'INSERT IGNORE INTO USERSCURSUS (id, grade, userID, cursusID, level, beginAt, endAt) VALUES ?';
  let values = [];
  cursusUsers.forEach((userCursus) => {
    let beginAt = new Date(userCursus.begin_at);
    let endAt;

    beginAt = moment(beginAt).format('YYYY-MM-DD HH:mm:ss');
    if (userCursus.end_at) {
      endAt = new Date(userCursus.end_at);
      endAt = moment(endAt).format('YYYY-MM-DD HH:mm:ss');
    }
    values.push([
      userCursus.id,
      userCursus.grade,
      userCursus.user.id,
      userCursus.cursus.id,
      userCursus.level,
      beginAt,
      endAt,
    ]);
  });
  db.query(query, [values], (err, result) => {
    cb(err, result);
  });
};

const registerUserProjects = (usersProjects, db, userId, cb) => {
  if (!usersProjects || !usersProjects.length) {
    return cb();
  }
  let query = 'INSERT IGNORE INTO USERSPROJECTS (id, projectID, userID, status, validated, finalMark, markedAt, retries) VALUES ?';
  let values = [];
  usersProjects.forEach((project) => {
    let markedAt;
    if (project.marked_at) {
      markedAt = new Date(project.marked_at);
      markedAt = moment(markedAt).format('YYYY-MM-DD HH:mm:ss');
    }
    values.push([
      project.id,
      project.project.id,
      userId,
      project.status,
      project['validated?'],
      project.final_mark,
      markedAt,
      project.occurrence,
    ]);
  });
  db.query(query, [values], (err, result) => {
    cb(err, result);
  });
};

const registerUserCampus = (campusUsers, db, cb) => {
  if (!campusUsers || !campusUsers.length) {
    return cb();
  }
  let query = 'INSERT IGNORE INTO USERSCAMPUS (ID, userID, campusID, isPrimary) VALUES ?';
  let values = [];
  campusUsers.forEach((userCampus) => {
    values.push([
      userCampus.id,
      userCampus.user_id,
      userCampus.campus_id,
      userCampus.is_primary,
    ]);
  });
  db.query(query, [values], (err, result) => {
    cb(err, result);
  });
};

const registerUser = (user, db, cb) => {
  let query = 'INSERT IGNORE INTO USERS (id, firstname, lastname, displayname, imageUrl, url, login, staff, poolMonth, poolYear) VALUES ?';
  let values = [];
  values.push([
    user.id,
    user.first_name,
    user.last_name,
    user.displayname,
    user.image_url,
    user.url,
    user.login,
    user['staff?'],
    user.pool_month,
    user.pool_year,
  ]);
  db.query(query, [values], (err, result) => {
    if (err) {
      cb(err, result);
    }
    registerUserCursus(user.cursus_users, db, (err, result) => {
      if (err) {
        cb(err, result);
      }
      registerUserProjects(user.projects_users, db, user.id, (err, result) => {
        if (err) {
          cb(err, result);
        }
        registerUserCampus(user.campus_users, db, (err, result) => {
          if (err) {
            cb(err, result);
          }
          registerUserAchievements(user.achievements, db, user.id, (err, result) => {
            cb(err, result);
          });
        });
      });
    });
  });
};

module.exports = registerUser;
