'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    async createUser(data) {
      const userCreate = await this.create(data);
      return userCreate;
    }
    async updateUser(userId, data) {
      const user = await this.findByPk(userId);
      if (!user) {
        throw new Error('Bus operator not found');
      }
      await user.update(data);
      return user;
    }
    async deleteUser(userId) {
      const user = await this.findByPk(userId);
      if (!user) {
        throw new Error('Bus operator not found');
      }
      await user.destroy();
      return user;
    }
    async getUserById(userId) {
      return await this.findByPk(userId);
    }
    async getAllUser() {
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