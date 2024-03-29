const Sequelize = require('sequelize');
const { sequelize } = require('../../models');
const Bus = require('../../models/bus')(sequelize)
const Bus_Operators = require('../../models/bus_operator')(sequelize)


async function createControllerBus(data){
    try{
      console.log("controller")
    const response = await Bus.createBus(data)
    return response
    }
    catch(error)
    {
        console.error(error);
      throw new Error('Error updating bus')
    }
}

async function updateControllerBus(busId, data) {
    try {
      const response = await Bus.updateBus(busId, data);
      return response;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating bus');
    }
}
async function destroyControllerBus(busId) {
    try {
      const response = await Bus.deleteBus(busId);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting bus');
    }
}
async function showOneControllerBus(busId) {
    try {
      const response = await Bus.showOneBus(busId);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching data from bus');
    }
}
async function showAllControllerBus(pageAsNumber, sizeAsNumber,search,keyword) {
  if (pageAsNumber || sizeAsNumber) {
    try {
      let page = 1;
      if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
          page = pageAsNumber;
      }

      let size = 20;
      if (!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 20) && !(sizeAsNumber < 1)) {
          size = sizeAsNumber;
      }
      
      if (search === "bus_operator_id") {
          // Search for keyword in Bus_Operators table to get corresponding bus_operator_ids
          const busOperatorIds = await Bus_Operators.findBusOperatorIdsByKeyword(keyword);
          console.log("busOperatorIds", busOperatorIds)
          // Use the bus_operator_ids to search for rows in the Buses table
          const { rows, count } = await Bus.showAllBusByOperatorIds(page - 1, size, busOperatorIds);
        const busOperatorData = await Bus_Operators.showAllBusOperator();
          // Return the result
          const updatedBus = rows.map(busData => {
              const bus_operator_name = busOperatorData.find(busoperator => busoperator.id == busData.bus_operator_id)?.name;
              return {
                  id: busData.id,
                  bus_operator_name,
                  ...busData.dataValues,
              };
          });
          return { rows: updatedBus, count };
        } else {
          const { rows, count } = await Bus.showAllBus(page - 1, size, search, keyword);
          const busOperatorData = await Bus_Operators.showAllBusOperator();
          // console.log("bus controler showall",busOperatorData)

          const updatedBus = rows.map(busData => {
              const bus_operator_name = busOperatorData.find(busoperator => busoperator.id == busData.bus_operator_id)?.name;
              // const { ...dataValues } = busData.dataValues;
              return {
                  id: busData.id,
                  bus_operator_name,
                  ...busData.dataValues,
          };
          });
          return { rows: updatedBus, count };
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error retrieving Bus data');
  }

  } else {
    const response = await Bus.showAllBus();

    const busOperatorData = await Bus_Operators.showAllBusOperator();
    // console.log("bus controler showall",busOperatorData)

    const updatedBus = response.map(busData => {
      const bus_operator_name = busOperatorData.find(busoperator => busoperator.id == busData.bus_operator_id)?.name;
      const {...dataValues } = busData.dataValues;
      return {
        id: busData.id,
        bus_operator_name,
        ...dataValues,
      };
    });
    return updatedBus
  }
}
  
  
module.exports={
    createControllerBus,
    updateControllerBus,
    destroyControllerBus,
    showAllControllerBus,
    showOneControllerBus
}