'use strict';

const sequelize      = require('./sequelize');
const Document       = require("./document");
const DocumentType   = require("./documenttype");
const User           = require("./user");
const Transaction    = require("./transaction");  

//Document
Document.belongsTo(User);
Document.belongsTo(DocumentType);
Document.belongsToMany(User,{through : Transaction});

//Document Type
DocumentType.hasOne(Document,{ onDelete: 'RESTRICT' });

//User
User.hasMany(Document,{ onDelete: 'RESTRICT' });
User.belongsToMany(Document,{through : Transaction});

module.exports = {
  sequelize,
  Document,
  DocumentType,
  User,        
  Transaction 
};
