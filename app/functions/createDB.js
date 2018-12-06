const createDB = (DBconnection) => DBconnection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME} character SET UTF8mb4 COLLATE utf8mb4_unicode_ci`);

module.exports = createDB;
