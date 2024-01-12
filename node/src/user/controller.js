const Sequelize = require('sequelize');
const { sequelize } = require('../../models');
const User = require('../../models/users')(sequelize)

async function createControllerUser(data){
    try{
    const response = await User.createUser(data)
    return response
    }
    catch(error)
    {
        console.error(error);
      throw new Error('Error updating User')
    }
}
async function updateControllerUser(UserId, data) {
    try {
      const response = await User.updateUser(UserId, data);
      return response;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating User');
    }
  }
  async function destroyControllerUser(UserId) {
    try {
      const response = await User.deleteUser(UserId);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting User');
    }
  }
  async function showOneControllerUser(UserId) {
    try {
      const response = await User.showOneUser(UserId);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching data from User');
    }
  }
  async function showAllControllerUser() {
    try {
      const response = await User.showAllUser();
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting User');
    }
  }
module.exports={
    createControllerUser,
    updateControllerUser,
    destroyControllerUser,
    showAllControllerUser,
    showOneControllerUser
}