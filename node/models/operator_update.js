const {
  Model,DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Operator_update extends Model {
    static async createOperatorUpdate(data) {
      const operatorUpdateCreate = await this.create(data);
      return operatorUpdateCreate;
    }
    static async updateOperatorUpdate(operatorUpdateId, data) {
      const operatorUpdate = await this.findByPk(operatorUpdateId);
    
      if (!operatorUpdate) {
        throw new Error('operatorUpdate not found');
      }
    
      await operatorUpdate.update(data);
      return operatorUpdate;
    }
    static async deleteOperatorUpdate(operatorUpdateId) {
      const operatorUpdate = await this.findByPk(operatorUpdateId);
      if (!operatorUpdate) {
        throw new Error('operatorUpdate operator not found');
      }
      await operatorUpdate.destroy();
      return operatorUpdate
    }
    static async showOneOperatorUpdate(operatorUpdateId) {
      return await this.findByPk(operatorUpdateId);
    }
    static async showAllOperatorUpdate() {
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