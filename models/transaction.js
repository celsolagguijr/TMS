'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {}
  };

  Transaction.init({
    UserId: DataTypes.INTEGER,
    documentId: DataTypes.INTEGER,
    transactionStatus: DataTypes.STRING,
    remarks: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};