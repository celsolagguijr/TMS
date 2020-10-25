'use strict';
const { Model, DataTypes , sequelize } = require('./sequelize');
const { hashPassword } = require("../functions/bcrypt");

  class User extends Model {};

  const {STRING} = DataTypes;
  
  User.init({
    fullName : {
      type : STRING,
      allowNull : false
    },
    userName : {
      type      : STRING,
      allowNull : false,
      unique    : true ,
      validate: value => {
        if (!validator.isEmail(value)) {
            throw new Error({error: 'Invalid Email address'})
        }
      }
    }, 
    password: {
      type : STRING,
      allowNull : false,
      minLenght : 8
    },
    profilePicture : {
      type : STRING,
      allowNull : true
    },
  }, {
    sequelize,
    modelName: 'User',
  });


  User.beforeCreate(async (user, options) => {
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
  });


  module.exports = User;
