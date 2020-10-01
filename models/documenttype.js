'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DocumentType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { 

      this.hasOne(models.Document,{
        onDelete : "restrict"
      })
      
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