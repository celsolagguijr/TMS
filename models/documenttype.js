'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DocumentType extends Model {

    static associate(models) { 

      this.hasOne(models.Document,{
        onDelete: 'RESTRICT'
      });
      
    }
  };
  DocumentType.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DocumentType',
  });



  return DocumentType;
};