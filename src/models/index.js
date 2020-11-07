'use strict';

const { sequelize , testConnection } = require('./sequelize');

const Document     = require('./document');
const DocumentType = require("./documenttype");
const Transaction  = require("./transaction");
const User         = require("./user");

//Document
Document.belongsTo(User);
Document.belongsTo(DocumentType);

//Document Type
DocumentType.hasOne(Document,{ onDelete: 'RESTRICT' });

//User
User.hasMany(Document,{ onDelete: 'RESTRICT' });

User.hasMany(Transaction);
Transaction.belongsTo(User);

Document.hasMany(Transaction);
Transaction.belongsTo(Document);


module.exports = {
  sequelize,
  testConnection,
  Document,
  DocumentType,
  User,        
  Transaction 
};
