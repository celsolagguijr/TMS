'use strict';

const {Sequelize,DataTypes,Model} = require("sequelize");
require('dotenv').config({path : "../../.env"});
const config = require("../config/config");

const sequelize = new Sequelize(
    config.development.database, 
    config.development.username, 
    config.development.password, {
        host: config.development.host,
        dialect: config.development.dialect
    }
);

const testConnection =async()=>  {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}


 module.exports = {sequelize , testConnection, DataTypes, Model};