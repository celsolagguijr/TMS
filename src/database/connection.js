'use strict';

const Sequelize = require("sequelize");

const sequelize = new Sequelize('sampleDB', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

const test=async()=>  {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = {sequelize , test};