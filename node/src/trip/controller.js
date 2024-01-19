const Sequelize = require('sequelize');
const { sequelize } = require('../../models');
const Trip = require('../../models/trip')(sequelize)

async function createControllerTrip(data){
    try{
    const response = await Trip.createTrip(data)
    return response
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