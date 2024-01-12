const Sequelize = require('sequelize');
const { sequelize } = require('../../models');
const OperatorUpdate = require('../../models/operator_update')(sequelize)

async function createControllerOperatorUpdate(data){
    try{
    const response = await OperatorUpdate.createOperatorUpdate(data)
    return response
    }
    catch(error)
    {
        console.error(error);
      throw new Error('Error updating OperatorUpdate')
    }
}
async function updateControllerOperatorUpdate(OperatorUpdateId, data) {
    try {
      const response = await OperatorUpdate.updateOperatorUpdate(OperatorUpdateId, data);
      return response;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating OperatorUpdate');
    }
  }
  async function destroyControllerOperatorUpdate(OperatorUpdateId) {
    try {
      const response = await OperatorUpdate.deleteOperatorUpdate(OperatorUpdateId);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting OperatorUpdate');
    }
  }
  async function showOneControllerOperatorUpdate(OperatorUpdateId) {
    try {
      const response = await OperatorUpdate.showOneOperatorUpdate(OperatorUpdateId);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching data from OperatorUpdate');
    }
  }
  async function showAllControllerOperatorUpdate() {
    try {
      const response = await OperatorUpdate.showAllOperatorUpdate();
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting OperatorUpdate');
    }
  }
module.exports={
    createControllerOperatorUpdate,
    updateControllerOperatorUpdate,
    destroyControllerOperatorUpdate,
    showAllControllerOperatorUpdate,
    showOneControllerOperatorUpdate
}