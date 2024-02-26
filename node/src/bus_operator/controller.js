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
      const busOperator = await BusOperator.showOneBusOperator(BusOperatorId);
    if (!busOperator) {
      throw new Error('Bus operator not found');
    }
    const totalAmount = busOperator.total_amount;
    const remainingPayment = totalAmount - data.paid;
    const newData = { ...data, remaining_payment: remainingPayment };
      const response = await BusOperator.updateBusOperator(BusOperatorId, newData);
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
  async function showAllControllerBusOperator(pageAsNumber,sizeAsNumber,search,keyword) {
    console.log("controller1",pageAsNumber,sizeAsNumber)
    if(pageAsNumber || sizeAsNumber)
    {
      try {
      let page = 1;
      if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
        page = pageAsNumber;
      }

      let size = 20;
      if (!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 20) && !(sizeAsNumber < 1)) {
        size = sizeAsNumber;
      }
      console.log("controller",page,size)
      const response = await BusOperator.showAllBusOperator(page-1,size,search,keyword);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting BusOperator');
    }
  }
  else
  {
    const response = await BusOperator.showAllBusOperator()
    return response;
  }
  }
  
module.exports={
    createControllerBusOperator,
    updateControllerBusOperator,
    destroyControllerBusOperator,
    showAllControllerBusOperator,
    showOneControllerBusOperator
}