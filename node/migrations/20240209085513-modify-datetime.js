'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('trips', 'date_of_journey', {
      type: Sequelize.DATEONLY,
      allowNull: false,
    });
    await queryInterface.addColumn('trips','payment_status',{
      type: Sequelize.STRING,
      allowNull:false, after:'paid'
    });
    await queryInterface.removeColumn('buses','bus_id')
    await queryInterface.removeColumn('bus_operators','bus_operator_id')
    
    
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('trips', 'payment_status');
    await queryInterface.changeColumn('trips', 'date_of_journey', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.addColumn('buses','bus_id'),{
      type:Sequelize.INTEGER,
      allowNull:false,
      after:'id'
    }
    await queryInterface.addColumn('bus_operators','bus_operator_id',{
      type:Sequelize.INTEGER,
      allowNull:false,
      after:'id'
    })
  }

};
