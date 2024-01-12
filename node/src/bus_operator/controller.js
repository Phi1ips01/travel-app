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
  async function showAllControllerBusOperator() {
    try {
      const response = await BusOperator.showAllBusOperator();
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting Bus Operator');
    }
  }
module.exports={
    createControllerBusOperator,
    updateControllerBusOperator,
    destroyControllerBusOperator,
    showAllControllerBusOperator,
    showOneControllerBusOperator
}