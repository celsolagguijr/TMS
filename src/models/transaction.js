'use strict';
const { Model, DataTypes , sequelize } = require('./sequelize');

  class Transaction extends Model {};

  Transaction.init({
    userId : DataTypes.INTEGER,
    documentId : DataTypes.INTEGER,
    transactionStatus: DataTypes.STRING,
    remarks: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });

  
  module.exports = Transaction;
