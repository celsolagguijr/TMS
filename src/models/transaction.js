'use strict';

const {sequelize , DataTypes} = require('./sequelize');

const {STRING} = DataTypes;

const Transaction = sequelize.define("Transaction",{
    transactionStatus: STRING(15),
    remarks: STRING(150)
});


module.exports = Transaction;
