'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : "Users",
          key : "id"
        },
        onDelete : "restrict"
      },
      documentId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : "Documents",
          key : "id"
        },
        onDelete : "restrict"
      },
      transactionStatus: {
        type: Sequelize.STRING
      },
      remarks: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Transactions');
  }
};