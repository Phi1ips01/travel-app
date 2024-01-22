'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('trips', 'date_of_journey', {
      type: Sequelize.DATE,
      allowNull:false,
      after:'address'
    });
      await queryInterface.addColumn('trips', 'boarding_point', {
        type: Sequelize.STRING,
        allowNull: false,
        after:'starting_point'
      });
    await queryInterface.addColumn('trips', 'seat_numbers', {
      type: Sequelize.STRING,
      allowNull: false,
      after:'destination_point'
    });
    await queryInterface.addColumn('trips', 'remarks', {
      type: Sequelize.STRING,
      after:'paid'

    });
    await queryInterface.addColumn('trips', 'agents', {
      type: Sequelize.STRING,
      after:'remarks'
    });
    await queryInterface.addColumn('buses', 'total_amount', {
      type: Sequelize.INTEGER,
      allowNull:false,
      after:'share',
    }); 
    await queryInterface.addColumn('buses', 'share_deducted_amount', {
      type: Sequelize.INTEGER,
      allowNull:false,
      after:'total_amount'
    }); 
    await queryInterface.addColumn('bus_operators', 'total_amount', {
      type: Sequelize.INTEGER,
      allowNull:false,
      after:'contact'
    }); 
    await queryInterface.addColumn('bus_operators', 'profit', {
      type: Sequelize.INTEGER,
      allowNull:false,
      after:'total_amount'
    }); 
    await queryInterface.addColumn('bus_operators', 'paid', {
      type: Sequelize.INTEGER,
      allowNull:false,
      after:'profit'
    }); 
    await queryInterface.addColumn('bus_operators', 'remaining_payment', {
      type: Sequelize.INTEGER,
      allowNull:false,
      after:'paid'
    }); 

    // Add more column additions as needed
  },

  async down(queryInterface, Sequelize) {
    // Rollback column additions:
    await queryInterface.removeColumn('trips', 'date_of_journey');
    await queryInterface.removeColumn('trips', 'boarding_point');
    await queryInterface.removeColumn('trips', 'seat_numbers');
    await queryInterface.removeColumn('trips', 'remarks');
    await queryInterface.removeColumn('trips', 'agents');
    await queryInterface.removeColumn('buses', 'total_amount');
    await queryInterface.removeColumn('buses', 'share_deducted_amount');
    await queryInterface.removeColumn('bus_operators', 'total_amount');
    await queryInterface.removeColumn('bus_operators', 'profit');
    await queryInterface.removeColumn('bus_operators', 'paid');
    await queryInterface.removeColumn('bus_operators', 'remaining_payment');

    // Rollback table synchronization if necessary
  },
};
