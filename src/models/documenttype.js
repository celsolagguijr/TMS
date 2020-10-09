'use strict';

const { Model, DataTypes , sequelize } = require('./sequelize');

  class DocumentType extends Model {};
  DocumentType.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DocumentType',
  });



  module.exports = DocumentType;
