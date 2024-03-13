'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('trips', 'boarding_time', {
      type: Sequelize.STRING,
      allowNull: false, // Adjust as needed
      after: 'destination_point', // Position after 'destination_point'
    });
    await queryInterface.removeColumn('trips', 'remarks');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('trips', 'remarks', {
      type: Sequelize.STRING,
      allowNull: true, // Adjust as needed
      after: 'agents', // Position after 'destination_point'
    });
    await queryInterface.removeColumn('trips', 'boarding_time');
  }
};
