'use strict';
const { Model, DataTypes , sequelize } = require('./sequelize');

  class User extends Model {};

  const {STRING} = DataTypes;
  
  User.init({
    fullName: STRING,
    userName: STRING,
    password: STRING
  }, {
    sequelize,
    modelName: 'User',
  });

 

  module.exports = User;
