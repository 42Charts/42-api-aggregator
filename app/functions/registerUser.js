var moment = require('moment');

const registerUserAchievements = (usersAchievements, userId, DBconnection) => new Promise ((resolve, reject) => {
  if (!usersAchievements || !usersAchievements.length) {
    return resolve();
  }
  let query = 'INSERT IGNORE INTO USERSACHIEVEMENTS (userID, achievementID) VALUES ?';
  let values = [];
  usersAchievements.forEach((usersAchievement) => {
    values.push([
      userId,
      usersAchievement.id,
    ]);
  });
  DBconnection.query(query, [values])
    .then(() => resolve())
    .catch(err => reject(err));
});

const registerUserCursus = (cursusUsers, DBconnection) => new Promise ((resolve, reject) => {
  if (!cursusUsers || !cursusUsers.length) {
    return resolve();
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
  DBconnection.query(query, [values])
    .then(() => resolve())
    .catch(err => reject(err));
});

const registerUserProjects = (usersProjects, userId, DBconnection) => new Promise ((resolve, reject) => {
  if (!usersProjects || !usersProjects.length) {
    return resolve();
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
  DBconnection.query(query, [values])
    .then(() => resolve())
    .catch(err => reject(err));
});

const registerUserCampus = (campusUsers, DBconnection) => new Promise ((resolve, reject) => {
  if (!campusUsers || !campusUsers.length) {
    return resolve();
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
  DBconnection.query(query, [values])
    .then(() => resolve())
    .catch(err => reject(err));
});

const registerUser = (user, DBconnection) => {
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
  return DBconnection.query(query, [values])
    .then(() => DBconnection.query('SET FOREIGN_KEY_CHECKS = 0'))
    .then(() => registerUserCursus(user.cursus_users, DBconnection))
    .then(() => registerUserProjects(user.projects_users, user.id, DBconnection))
    .then(() => registerUserCampus(user.campus_users, DBconnection))
    .then(() => registerUserAchievements(user.achievements, user.id, DBconnection));
};

module.exports = registerUser;
