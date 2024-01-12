const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Operator_update extends Model {
    async createOperatorUpdate(data) {
      const operatorUpdateCreate = await this.create(data);
      return operatorUpdateCreate;
    }
    async updateOperatorUpdate(operatorUpdateId, data) {
      const operatorUpdate = await this.findByPk(operatorUpdateId);
      if (!operatorUpdate) {
        throw new Error('Bus operator not found');
      }
      await operatorUpdate.update(data);
      return operatorUpdate;
    }
    async deleteOperatorUpdate(operatorUpdateId) {
      const operatorUpdate = await this.findByPk(operatorUpdateId);
      if (!operatorUpdate) {
        throw new Error('Bus operator not found');
      }
      await operatorUpdate.destroy();
    }
    async getOperatorUpdateById(operatorUpdateId) {
      return await this.findByPk(operatorUpdateId);
    }
    async getAllOperatorUpdate() {
      return await this.findAll();
    }
  
    
    static associate(models) {
      // define association here
    }
  }
  Operator_update.init({
    bus_operator_id: DataTypes.INTEGER,
    bus_id: DataTypes.INTEGER,
    trip_id: DataTypes.INTEGER,
    total_amount: DataTypes.INTEGER,
    paid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Operator_update',
  });
  return Operator_update;
};