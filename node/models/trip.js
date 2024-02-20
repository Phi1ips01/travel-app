'use strict';

const {
  Model,DataTypes
} = require('sequelize');
const Buses = require('./bus');
const Bus_operators = require('./bus_operator');
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
    // static async updateTotalAmountTrip(tripId,data){
      
    // }
      
    static async deleteTrip(tripId) {
      console.log("mode",tripId)
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
    static async showAllTrip(page, size) {
      if (page || size) {
      const offset = page * size; // Calculate the offset for pagination
    
      try {
        const result = await this.findAndCountAll({
          limit: size,
          offset: offset,
          order: [['id', 'DESC']], 
          // include: [
          //   { model: Buses, attributes: ['name'] },
          //   { model: Bus_operators, attributes: ['name'] }
          // ]
        });
    
        return result;
      } catch (error) {
        // Handle errors appropriately
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to be handled by the caller
      }
    } else {
      const result = await this.findAll({
        order: [['id', 'DESC']] // Order by id in ascending order
      });
      return result;
    }
    }
    
  
    static associate(models) {
      console.log("Models",Model)
      console.log("models",models)
      // this.belongsTo(models.Bus, { foreignKey: 'bus_id', as: 'Bus' });
      // this.belongsTo(models.Bus_operator, { foreignKey: 'bus_operator_id', as: 'Bus_operator' });

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
    payment_status: DataTypes.STRING,
    remarks: DataTypes.STRING,
    agents: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};