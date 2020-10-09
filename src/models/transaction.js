'use strict';
const { Model, DataTypes , sequelize } = require('./sequelize');

  class Transaction extends Model {};

  Transaction.init({
    transactionStatus: DataTypes.STRING,
    remarks: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });

  
  module.exports = Transaction;
