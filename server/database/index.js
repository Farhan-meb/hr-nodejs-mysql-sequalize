const config = require("../config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.db.mysql.dbname, config.db.mysql.username, config.db.mysql.password, {
  host: config.db.mysql.host,
  dialect: config.db.mysql.dialect,
  operatorsAliases: 0,
  logging: false,

  pool: {
    max: config.db.mysql.pool.max,
    min: config.db.mysql.pool.min,
    acquire: config.db.mysql.pool.acquire,
    idle: config.db.mysql.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employees = require("../models/employee/employee.model")(sequelize, Sequelize);


module.exports = db;
