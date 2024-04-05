'use strict';

const {
  Model,DataTypes
} = require('sequelize');
const { Op } = require('sequelize');

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
      console.log("trip_model_update",trip)
      return trip;
    }
      
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
    static async showAllTrip(page, size,search,keyword) {
      if (page || size) {
        const offset = page * size; // Calculate the offset for pagination
        try {
          if(search && keyword)
          {
            let whereClause = {}
            whereClause[search] = { [Op.like]: `%${keyword}%` }
            const result =await this.findAndCountAll({
              where: whereClause,
              limit: size,
              offset: offset,
              order: [['id', 'DESC']] 
            })
            return result
          }
        else{
          const result = await this.findAndCountAll({
            limit: size,
            offset: offset,
            order: [['id', 'DESC']] 
          });
      
          return result;
        }
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
    
    static async showAllTripByOperatorIds(page, size, operatorIds) {
      const { rows, count } = await this.findAndCountAll({
          where: {
              operator_id: {
                  [Op.in]: operatorIds
              }
          },
          limit: size,
          offset: page * size
      });
      return { rows, count };
  }
  static async showAllTripByBusIds(page, size, busIds) {
    const { rows, count } = await this.findAndCountAll({
        where: {
            bus_id: {
                [Op.in]: busIds
            }
        },
        limit: size,
        offset: page * size
    });
    return { rows, count };
}
    // Assuming your Trip model has a method called `findAll` for fetching trips
static async showAllTripByDate(page, size, startDate, endDate) {
  const trips = await this.findAndCountAll({
      where: {
          date_of_journey: {
              [Op.between]: [startDate, endDate],
          },
      },
      offset: page * size,
      limit: size,
  });

  return trips;
}

  
    static associate(models) {

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
    date_of_journey:DataTypes.STRING,
    age: DataTypes.INTEGER,
    number_of_tickets: DataTypes.INTEGER,
    total_amount: DataTypes.INTEGER,
    paid: DataTypes.INTEGER,
    payment_status: DataTypes.STRING,
    boarding_time: DataTypes.STRING,
    agents: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};