'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Change the datatype of date_of_journey to STRING
    await queryInterface.changeColumn('trips', 'date_of_journey', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert the datatype change
    await queryInterface.changeColumn('trips', 'date_of_journey', {
      type: Sequelize.DATE,
    });
  },
};
