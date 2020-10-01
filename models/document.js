'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsTo(models.User);

      this.belongsTo(models.DocumentType);

      this.belongsToMany(models.Users,{through : models.Transaction});

    }
  };
  Document.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    documentTypeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Document',
  });

  return Document;
};