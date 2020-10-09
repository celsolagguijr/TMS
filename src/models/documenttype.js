'use strict';

const {sequelize , DataTypes} = require('./sequelize');

const {STRING} = DataTypes;

const DocumentType = sequelize.define("DocumentType",{
  description: STRING(15)
});


module.exports = DocumentType;
