'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {

      this.hasMany(models.Document,{
        onDelete: 'RESTRICT'
      });

      this.belongsToMany(models.Document,{through : models.Transaction});
    }
  };
  User.init({
    fullName: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

 

  return User;
};