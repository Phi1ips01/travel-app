'use strict';
const {
  Model,DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class User extends Model {
    static async createUser(data) {
      const userCreate = await this.create(data);
      return userCreate;
    }
    static async updateUser(userId, data) {
      const user = await this.findByPk(userId);
    
      if (!user) {
        throw new Error('User not found');
      }
    
      await user.update(data);
      return user;
    }
    static async deleteUser(userId) {
      const user = await this.findByPk(userId);
      if (!user) {
        throw new Error('User operator not found');
      }
      await user.destroy();
      return user
    }
    static async showOneUser(userId) {
      return await this.findByPk(userId);
    }
    static async showAllUser() {
      return await this.findAll();
    }
  
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};