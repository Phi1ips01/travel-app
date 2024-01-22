'use strict';
const {
  Model,DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Trip extends Model {
    static async createTrip(data) {
      const tripCreate = await this.create(data);
      return tripCreate;
    }
    static async updateTrip(tripId, data) {
      const trip = await this.findByPk(tripId);
    
      if (!trip) {
        throw new Error('trip not found');
      }
    
      await trip.update(data);
      return trip;
    }
    static async deleteTrip(tripId) {
      const trip = await this.findByPk(tripId);
      if (!trip) {
        throw new Error('trip operator not found');
      }
      await trip.destroy();
      return trip
    }
    static async showOneTrip(tripId) {
      return await this.findByPk(tripId);
    }
    static async showAllTrip() {
      return await this.findAll();
    }
  
    static associate(models) {
      // define association here
    }
  }
  Trip.init({
    operator_id: DataTypes.INTEGER,
    bus_id: DataTypes.INTEGER,
    trip_id: DataTypes.INTEGER,
    customer_name: DataTypes.STRING,
    contact: DataTypes.STRING,
    alternate_contact: DataTypes.STRING,
    starting_point: DataTypes.STRING,
    boarding_point: DataTypes.STRING,
    destination_point: DataTypes.STRING,
    seat_numbers:DataTypes.STRING,
    address: DataTypes.STRING,
    date_of_journey:DataTypes.DATE,
    age: DataTypes.INTEGER,
    number_of_tickets: DataTypes.INTEGER,
    total_amount: DataTypes.INTEGER,
    paid: DataTypes.INTEGER,
    remarks: DataTypes.STRING,
    agents: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};