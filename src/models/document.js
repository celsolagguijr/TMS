'use strict';

const {sequelize , DataTypes} = require('./sequelize');

const {STRING} = DataTypes;

const Document = sequelize.define("Document",{
  title: STRING(50),
  description: STRING(150)
});

module.exports = Document;






