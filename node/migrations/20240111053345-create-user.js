'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try{
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        validate:{
          is: [a-zA-Z][a-zA-Z ]+[a-zA-Z]
        },
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        isEmail: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      role: {
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
      throw new Error('Invalid name format. Name must start and end with letters and can contain letters and spaces.', 500);
  }else if (error.errors && error.errors.email) {
    // Handle share validation error
    throw new Error('Invalid email address', 500);
  }
}
},
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};