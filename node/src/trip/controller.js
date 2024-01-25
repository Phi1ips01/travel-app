const Sequelize = require('sequelize');
const { sequelize } = require('../../models');
const Trip = require('../../models/trip')(sequelize)
const Buses = require('../../models/bus')(sequelize)
const Bus_Operators = require('../../models/bus_operator')(sequelize)


async function createControllerTrip(data){
    try{
    const tripResponse = await Trip.createTrip(data)
    console.log("createcontroleertrip",tripResponse.total_amount)
    console.log("createcontroleertrip",tripResponse.dataValues.operator_id)

    const busResponse = await Buses.updateTotalAmountAndShareDeductedBus(tripResponse.bus_id, tripResponse.total_amount);
    console.log("controllerrrr",busResponse.dataValues)
    const busOperatorResponse = await Bus_Operators.updateTotalAmountAndProfitBusOperator(
      tripResponse.dataValues.operator_id,
      busResponse.dataValues.total_amount,
      busResponse.dataValues.share_deducted_amount
      );
      return tripResponse
    }
    catch(error)
    {
        console.error(error);
      throw new Error('Error updating Trip')
    }
}
async function updateControllerTrip(TripId, data) {
    try {
      const response = await Trip.updateTrip(TripId, data);
      return response;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating Trip');
    }
  }
  async function destroyControllerTrip(TripId) {
    try {
      const response = await Trip.deleteTrip(TripId);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting Trip');
    }
  }
  async function showOneControllerTrip(TripId) {
    try {
      const response = await Trip.showOneTrip(TripId);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching data from Trip');
    }
  }
  async function showAllControllerTrip() {
    try {
      const response = await Trip.showAllTrip();
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting Trip');
    }
  }
module.exports={
    createControllerTrip,
    updateControllerTrip,
    destroyControllerTrip,
    showAllControllerTrip,
    showOneControllerTrip
}