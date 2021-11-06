const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('schooldb', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
})

module.exports = sequelize;