'use strict';

const {sequelize , DataTypes} = require('./sequelize');

const {STRING} = DataTypes;

const User = sequelize.define("User",{
  fullName: STRING(50),
  userName: STRING(30),
  password: STRING(30)
});


module.exports = User;
