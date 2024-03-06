const Sequelize = require('sequelize');
const moment = require('moment')
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
  async function showAllControllerTrip(pageAsNumber, sizeAsNumber, search, keyword) {
    if (pageAsNumber || sizeAsNumber) {
        try {
            let page = 1;
            if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
                page = pageAsNumber;
            }

            let size = 10;
            if (!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)) {
                size = sizeAsNumber;
            }

            if (search === "operator_id") {
                const busOperatorIds = await Bus_Operators.findBusOperatorIdsByKeyword(keyword);
                const { rows, count } = await Trip.showAllTripByOperatorIds(page - 1, size, busOperatorIds);
                const busOperatorData = await Bus_Operators.showAllBusOperator();
                const busData = await Buses.showAllBus()
                const updatedTrip = rows.map(tripData => {
                    const bus_operator_name = busOperatorData.find(busoperator => busoperator.id == tripData.operator_id)?.name;
                    const bus_name = busData.find(bus => bus.id == tripData.bus_id)?.name;
                    return {
                        id: tripData.id,
                        bus_operator_name,
                        bus_name,
                        ...tripData.dataValues,
                    };
                });
                return { rows: updatedTrip, count };
            } 
            else if(search === "date_of_journey")
            {
              let startDate, endDate;
            if (keyword.length === 7) {
                // If the keyword is a month (YYYY-MM), search for trips within that month
                startDate = moment(keyword, 'YYYY-MM').startOf('month').toDate();
                endDate = moment(keyword, 'YYYY-MM').endOf('month').toDate();
            } else {
                // If the keyword is a full date (YYYY-MM-DD), search for trips on that specific date
                startDate = moment(keyword, 'YYYY-MM-DD').startOf('day').toDate();
                endDate = moment(keyword, 'YYYY-MM-DD').endOf('day').toDate();
            }

            const { rows, count } = await Trip.showAllTripByDate(page - 1, size, startDate, endDate);
            const busOperatorData = await Bus_Operators.showAllBusOperator();
            const busData = await Buses.showAllBus();
            const updatedTrip = rows.map(tripData => {
                const bus_name = busData.find(bus => bus.id == tripData.bus_id)?.name;
                const bus_operator_name = busOperatorData.find(busoperator => busoperator.id == tripData.operator_id)?.name;
                return {
                    id: tripData.id,
                    bus_name,
                    bus_operator_name,
                    ...tripData.dataValues,
                };
            });
            return { rows: updatedTrip, count };
            }
            
            else if (search === "bus_id") {
                const busIds = await Buses.findBusIdsByKeyword(keyword);
                const { rows, count } = await Trip.showAllTripByBusIds(page - 1, size, busIds);
                const busOperatorData = await Bus_Operators.showAllBusOperator();
                const busData = await Buses.showAllBus();
                const updatedTrip = rows.map(tripData => {
                    const bus_name = busData.find(bus => bus.id == tripData.bus_id)?.name;
                    const bus_operator_name = busOperatorData.find(busoperator => busoperator.id == tripData.operator_id)?.name;
                    return {
                        id: tripData.id,
                        bus_name,
                        bus_operator_name,
                        ...tripData.dataValues,
                    };
                });
                return { rows: updatedTrip, count };
            } else {
                const { count, rows } = await Trip.showAllTrip(page - 1, size, search, keyword);
                const busData = await Buses.showAllBus();
                const busOperatorData = await Bus_Operators.showAllBusOperator();
              console.log("trip controller shwoall",rows)
              console.log("controller trip busdata",busData)
              console.log("trip controller operatordata",busOperatorData)
                const updatedResponse = rows.map(tripData => {
                    const bus_name = busData.find(bus => bus.id == tripData.bus_id)?.name;
                    const bus_operator_name = busOperatorData.find(busoperator => busoperator.id == tripData.operator_id)?.name;

                    const { ...dataValues } = tripData.dataValues;

                    return {
                        id: tripData.id,
                        bus_name,
                        bus_operator_name,
                        ...dataValues,
                    };
                });

                return { rows: updatedResponse, count };
            }
        } catch (error) {
            console.error(error);
            throw new Error('Error retrieving Trip data');
        }
    } else {
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