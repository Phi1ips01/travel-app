'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Operator_updates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bus_operator_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      bus_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      trip_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      total_amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      paid: {
        allowNull: false,
        type: Sequelize.INTEGER
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Operator_updates');
  }
};