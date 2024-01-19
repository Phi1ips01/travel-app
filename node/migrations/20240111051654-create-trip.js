'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try{
    await queryInterface.createTable('Trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      operator_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      trip_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      bus_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      customer_name: {
        type: Sequelize.STRING,
        validate:{
          is:/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/
        },
        allowNull:false

      },
      contact: {
        type: Sequelize.STRING,
        allowNull:false
      },
      alternate_contact: {
        type: Sequelize.STRING
      },
      starting_point: {
        type: Sequelize.STRING,
        allowNull:false
      },
      destination_point: {
        type: Sequelize.STRING,
        allowNull:false
      },
      address: {
        type: Sequelize.STRING,
        allowNull:false
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      number_of_tickets: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      total_amount: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      paid: {
        type: Sequelize.INTEGER,
        allowNull:false
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
  } catch(error)
  {
    if (error.errors && error.errors.name) {
      // Handle name validation error
      throw new Error('Invalid Name format. Name must start and end with letters and can contain letters and spaces.', 500);
  }
  }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Trips');
  }
};