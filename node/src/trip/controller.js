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
async function updateControllerTrip(TripId, newData) {
  try {
    // Retrieve the old trip data
    const oldTrip = await Trip.showOneTrip(TripId);

    // Update the trip with the new data
    const updatedTrip = await Trip.updateTrip(TripId, newData);

    // Calculate changes in trip data
    const totalAmountChange = updatedTrip.total_amount - oldTrip.total_amount;
    const operatorId = updatedTrip.operator_id;

    // Update the associated bus
    const updatedBus = await Buses.updateTotalAmountAndShareDeductedBusOnUpdate(
      updatedTrip.bus_id,
      updatedTrip.total_amount,
      oldTrip.total_amount
    );

    // Update the associated bus operator
    const updatedBusOperator = await Bus_Operators.updateTotalAmountAndProfitBusOperatorOnUpdate(
      operatorId,
      updatedBus.total_amount,
      updatedBus.share_deducted_amount,
      oldTrip.total_amount,
      oldTrip.share_deducted_amount
    );

    console.log("Trip updated successfully.");
    return updatedTrip;
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
  async function showAllControllerTrip(pageAsNumber,sizeAsNumber) {
    try {
      let page = 1;
      if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
        page = pageAsNumber;
      }

      let size = 20;
      if (!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 20) && !(sizeAsNumber < 1)) {
        size = sizeAsNumber;
      }
      const response = await Trip.showAllTrip(page-1,size);
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