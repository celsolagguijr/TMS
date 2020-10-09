'use strict';
const { Model, DataTypes , sequelize } = require('./sequelize');

  class Document extends Model {};
  Document.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Document',
  });

  module.exports = Document;
