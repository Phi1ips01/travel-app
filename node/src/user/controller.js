const Sequelize = require('sequelize');
const passport = require('passport');
const jwt = require('jsonwebtoken')
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
  async function showOneByPkControllerUser(UserId) {
    try {
      const response = await User.showOneByPkUser(UserId);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching data from User');
    }
  }
  async function showAllControllerUser(pageAsNumber,sizeAsNumber) {
    try {
      let page = 1;
      if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
        page = pageAsNumber;
      }

      let size = 20;
      if (!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 20) && !(sizeAsNumber < 1)) {
        size = sizeAsNumber;
      }
      console.log("contorler",page,size)
      const response = await User.showAllUser(page-1,size);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting User');
    }
  }
  
  async function loginControllerUser(userData) {
      try {
          const user = await User.showOneByUser("email", userData.email);
          if (!user) {
              return {
                  success: false,
                  message: "Could not find the user"
              };
          }
  
          if (userData.password !== user.password) {
              return {
                  success: false,
                  message: "Incorrect password"
              };
          }
  
          const payload = {
              username: user.username,
              id: user.id,
              role: user.role
          };
  
          const token = jwt.sign(payload, "K3fcvhg42lmm3o4?nf3", { expiresIn: "1d" });
  
          return {
              success: true,
              message: "Login successful",
              token: "Bearer " + token,
              payload:payload
          };
      } catch (error) {
          console.error(error);
          return {
              success: false,
              message: "Internal Server Error"
          };
      }
  }
  
  module.exports = loginControllerUser;
  
  

module.exports={
    createControllerUser,
    updateControllerUser,
    destroyControllerUser,
    showAllControllerUser,
    showOneByPkControllerUser,
    loginControllerUser,
}