const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Admin = sequelize.define(
  'Admin',
  {
    loginId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    loginPwd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    paranoid: true
  }
)

module.exports = Admin;