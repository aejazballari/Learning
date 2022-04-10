const { Sequelize  } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize("todo", "root", process.env.DbPassword, {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  });

  module.exports = sequelize;