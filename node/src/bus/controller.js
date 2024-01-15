const Sequelize = require('sequelize');
const { sequelize } = require('../../models');
const Bus = require('../../models/bus')(sequelize)

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
  async function showAllControllerBus() {
    try {
      const response = await Bus.showAllBus();
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting bus');
    }
  }
module.exports={
    createControllerBus,
    updateControllerBus,
    destroyControllerBus,
    showAllControllerBus,
    showOneControllerBus
}