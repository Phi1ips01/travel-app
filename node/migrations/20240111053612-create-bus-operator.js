'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try{
    await queryInterface.createTable('Bus_operators', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bus_operator_id: {
        type: Sequelize.INTEGER
      },
      name: {
        validate:{
          is: /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/
        },
        allowNull: false,
        type: Sequelize.STRING
      },
      contact: {
        allowNull: false,
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
  }catch(error){
    if (error.errors && error.errors.name) {
      // Handle name validation error
      throw new Error('Invalid operator name format. Name must start and end with letters and can contain letters and spaces.', 500);
  }
  }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bus_operators');
  }
};