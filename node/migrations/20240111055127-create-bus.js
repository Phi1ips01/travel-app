'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('Buses', {
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
        name: {
          validate: {
            is: /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/
          },
          allowNull: false,
          type: Sequelize.STRING
        },
        type: {
          allowNull: false,
          type: Sequelize.STRING
        },
        share: {
          allowNull: false,
          type: Sequelize.INTEGER,
          min: 0,
          max: 100
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
    } catch (error) {
      if (error.errors && error.errors.name) {
        // Handle name validation error
        throw new Error('Invalid bus name format. Name must start and end with letters and can contain letters and spaces.', 500);
      } else if (error.errors && error.errors.share) {
        // Handle share validation error
        throw new Error('Share value must be between 0 and 100.', 500);
      } else {
        // Handle other errors
        throw error;
      }
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Buses');
  }
}