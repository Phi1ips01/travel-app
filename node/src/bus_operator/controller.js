const Sequelize = require('sequelize');
const { sequelize } = require('../../models');
const BusOperator = require('../../models/bus_operator')(sequelize)

async function createControllerBusOperator(data){
    try{
    const response = await BusOperator.createBusOperator(data)
    return response
    }
    catch(error)
    {
        console.error(error);
      throw new Error('Error updating BusOperator')
    }
}
async function updateControllerBusOperator(BusOperatorId, data) {
    try {
      const response = await BusOperator.updateBusOperator(BusOperatorId, data);
      return response;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating Bus Operator');
    }
  }
  async function destroyControllerBusOperator(BusOperatorId) {
    try {
      const response = await BusOperator.deleteBusOperator(BusOperatorId);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting Bus Operator');
    }
  }
  async function showOneControllerBusOperator(BusOperatorId) {
    try {
      const response = await BusOperator.showOneBusOperator(BusOperatorId);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching data from Bus Operator');
    }
  }
  async function showAllControllerBusOperator(pageAsNumber,sizeAsNumber) {
    try {
      let page = 1;
      if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
        page = pageAsNumber;
      }

      let size = 20;
      if (!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 20) && !(sizeAsNumber < 1)) {
        size = sizeAsNumber;
      }
      const response = await BusOperator.showAllBusOperator(page-1,size);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting BusOperator');
    }
  }
  
module.exports={
    createControllerBusOperator,
    updateControllerBusOperator,
    destroyControllerBusOperator,
    showAllControllerBusOperator,
    showOneControllerBusOperator
}