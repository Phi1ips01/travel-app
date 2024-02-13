'use strict';
const {
  Model,DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Users extends Model {
    static async createUser(data) {
      const userCreate = await this.create(data);
      return userCreate;
    }
    static async updateUser(userId, data) {
      const user = await this.findByPk(userId);
    
      if (!user) {
        throw new Error('user not found');
      }
    
      await user.update(data);
      return user;
    }
    static async deleteUser(userId) {
      console.log("user model", userId)
      const user = await this.findByPk(userId);
      if (!user) {
        throw new Error('user not found');
      }
      await user.destroy();
      return user
    }
    static async showOneByPkUser(userId) {
      return await this.findByPk(userId);
    }
    static async showOneByUser(attributeName,attributeValue){
      const whereClause ={}
      whereClause[attributeName]=attributeValue
      return this.findOne({where:whereClause})
    }
    static async showAllUser() {
      return await this.findAll({
        order: [['id', 'DESC']] // Replace 'columnName' with the actual column name you want to sort by
      });
    }
    /**
    
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};