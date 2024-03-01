const Sequelize = require('sequelize');
const { sequelize } = require('../../models');
const Trip = require('../../models/trip')(sequelize)
const Buses = require('../../models/bus')(sequelize)
const Bus_Operators = require('../../models/bus_operator')(sequelize)
async function createControllerTrip(data){
    try{
    const tripResponse = await Trip.createTrip(data)
    const oldBusResponse = await Buses.showOneBus(tripResponse.bus_id)
    const busResponse = await Buses.updateTotalAmountAndShareDeductedBus(tripResponse.bus_id, tripResponse.total_amount);
      const totalAmountChange = parseInt(busResponse.dataValues.total_amount) - parseInt(oldBusResponse.dataValues.total_amount)
      const oldProfit = (parseInt(oldBusResponse.dataValues.total_amount)-parseInt(oldBusResponse.dataValues.share_deducted_amount))
      const newProfit= (parseInt(busResponse.dataValues.total_amount)-parseInt(busResponse.dataValues.share_deducted_amount))
      const profitChange = newProfit-oldProfit
      console.log("oldnewprofit",totalAmountChange,profitChange)
    const busOperatorResponse = await Bus_Operators.updateTotalAmountAndProfitBusOperator(
      tripResponse.dataValues.operator_id,
      totalAmountChange,
      profitChange
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
    const oldBus = await Buses.showOneBus(oldTrip.bus_id)
    const updatedTrip = await Trip.updateTrip(TripId, newData);
    console.log("trip controller newdata",newData)
    if(parseInt(oldTrip.operator_id)!==parseInt(updatedTrip.operator_id))
    {
      const oldOperator = await Bus_Operators.showOneBusOperator(oldTrip.operator_id)
       await Buses.updateOldTaAndSda(
        oldBus.id,
        oldTrip.total_amount,
        // subtract the total amount from the old bus
      )
        const updatedNewBus = await Buses.updatedNewTaAndSdaBus(
          updatedTrip.bus_id,
        updatedTrip.total_amount
        // add the total amount to the new bus
        )
     
        const oldOperatorProfit = (parseInt(oldBus.total_amount)-parseInt(oldBus.share_deducted_amount))
        const newOperatorProfit = parseInt(updatedNewBus.total_amount)-parseInt(updatedNewBus.share_deducted_amount)
        await Bus_Operators.updateOldTaAndProfitBusOperator(
          oldTrip.operator_id,oldBus.total_amount,oldOperatorProfit
      )
        await Bus_Operators.updatedNewTaAndProfitBusOperator(
          updatedTrip.operator_id,updatedNewBus.total_amount,newOperatorProfit
      )
      console.log("if(parseInt(oldTrip.operator_id)!==parseInt(updatedTrip.operator_id))");

    }
    // Calculate changes in trip data
    else if((parseInt(oldTrip.operator_id) === parseInt(updatedTrip.operator_id)) && (parseInt(oldTrip.bus_id) !== parseInt(updatedTrip.bus_id)))
    {
      const updatedOldBus = await Buses.updateOldTaAndSda(
        oldBus.id,
        oldTrip.total_amount,
        // subtract the total amount from the old bus
      )
        const updatedNewBus = await Buses.updatedNewTaAndSdaBus(
        updatedTrip.bus_id,
        updatedTrip.total_amount
        // add the total amount to the new bus
        )
        const totalAmountChange = updatedNewBus.total_amount - oldBus.total_amount
        const OperatorProfit = (updatedNewBus.total_amount-updatedNewBus.share_deducted_amount) - (oldBus.total_amount-oldBus.share_deducted_amount)
        const updatedBusOperator = await Bus_Operators.updateProfitBusOperator(oldTrip.operator_id,totalAmountChange,OperatorProfit)
  
      console.log(" && parseInt(oldTrip.bus_id) !== parseInt(updatedTrip.bus_id)");
      return updatedTrip;
    }
    else 
    {
      const operatorId = parseInt(updatedTrip.operator_id);
      const updatedBus = await Buses.updateTotalAmountAndShareDeductedBusOnUpdate(
        updatedTrip.bus_id,
        updatedTrip.total_amount,
        oldTrip.total_amount
      );
      const totalAmountChange = parseInt(updatedBus.total_amount) - parseInt(oldBus.total_amount)
      const profitChange = (parseInt(updatedBus.total_amount)-parseInt(updatedBus.share_deducted_amount))-(parseInt(oldBus.total_amount)-parseInt(oldBus.share_deducted_amount)) 
      const updatedBusOperator = await Bus_Operators.updateTotalAmountAndProfitBusOperatorOnUpdate(
        operatorId,
        totalAmountChange,
        profitChange
      );
      console.log("Trip else");
      return updatedTrip;
    }
    
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
  async function showAllControllerTrip(pageAsNumber,sizeAsNumber,search,keyword) {
    if(pageAsNumber || sizeAsNumber)
    {
      try {
        console.log("search ",keyword)
        let page = 1;
        if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
          page = pageAsNumber;
        }
    
        let size = 10;
        if (!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)) {
          size = sizeAsNumber;
        }
    
        const { count, rows } = await Trip.showAllTrip(page - 1, size,search,keyword);
        const busData = await Buses.showAllBus(page - 1, size);
        const busOperatorData = await Bus_Operators.showAllBusOperator(page - 1, size);
    
        const updatedResponse = rows.map(tripData => {
          const bus_name = busData.rows.find(bus => bus.id == tripData.bus_id)?.name;
          const bus_operator_name = busOperatorData.rows.find(busoperator => busoperator.id == tripData.operator_id)?.name;
    
          const {  ...dataValues } = tripData.dataValues;
    
          return {
            id: tripData.id,
            bus_name,
            bus_operator_name,
            ...dataValues,
          };
        });
    
        return { rows: updatedResponse, count };
      } catch (error) {
        console.error(error);
        throw new Error('Error retrieving Trip data');
      }
  }
  else
  {
      const response = await Trip.showAllTrip();
      const busData = await Buses.showAllBus();
      const busOperatorData = await Bus_Operators.showAllBusOperator();
      const updatedResponse = response.map(tripData => {
      const bus_name = busData.find(bus => bus.id == tripData.bus_id)?.name;
      const bus_operator_name = busOperatorData.find(busoperator => busoperator.id == tripData.operator_id)?.name;

      const { bus_id, operator_id, ...dataValues } = tripData.dataValues;

      return {
        id: tripData.id,
        bus_name,
        bus_operator_name,
        ...dataValues,
      };
    });
    return updatedResponse;
  }
  }
module.exports={
    createControllerTrip,
    updateControllerTrip,
    destroyControllerTrip,
    showAllControllerTrip,
    showOneControllerTrip
}