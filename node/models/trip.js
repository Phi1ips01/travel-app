'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    async createTrip(data) {
      const tripCreate = await this.create(data);
      return tripCreate;
    }
    async updateTrip(tripId, data) {
      const trip = await this.findByPk(tripId);
      if (!trip) {
        throw new Error('Trip not found');
      }
      await trip.update(data);
      return trip;
    }
    async deleteTrip(tripId) {
      const trip = await this.findByPk(tripId);
      if (!trip) {
        throw new Error('Trip not found');
      }
      await trip.destroy();
      return trip
    }
    async getTripById(tripId) {
      return await this.findByPk(tripId);
    }
    async getAllTrip() {
      return await this.findAll();
    }
  
    static associate(models) {
      // define association here
    }
  }
  Trip.init({
    operator_id: DataTypes.INTEGER,
    trip_id: DataTypes.INTEGER,
    bus_id: DataTypes.INTEGER,
    customer_name: DataTypes.STRING,
    contact: DataTypes.STRING,
    alternate_contact: DataTypes.STRING,
    starting_point: DataTypes.STRING,
    destination_point: DataTypes.STRING,
    address: DataTypes.STRING,
    age: DataTypes.INTEGER,
    number_of_tickets: DataTypes.INTEGER,
    total_amount: DataTypes.INTEGER,
    paid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};