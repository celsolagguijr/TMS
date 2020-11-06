'use strict';
const { Model, DataTypes , sequelize } = require('./sequelize');

  class Document extends Model {};


  const {STRING,INTEGER} = DataTypes;


  Document.init({
    title: STRING,
    description: STRING,
    documentTypeId : INTEGER,
    userId : INTEGER
  },{
    sequelize,
    modelName: 'Document',
  });

  module.exports = Document;
