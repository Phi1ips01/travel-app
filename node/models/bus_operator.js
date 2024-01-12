
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bus_operator extends Model {
    async createBusOperator(data) {
      const busOperatorCreate = await this.create(data);
      return busOperatorCreate;
    }
    async updateBusOperator(busOperatorId, data) {
      const busOperator = await this.findByPk(busOperatorId);
      if (!busOperator) {
        throw new Error('Bus operator not found');
      }
      await busOperator.update(data);
      return busOperator;
    }
    async deleteBusOperator(busOperatorId) {
      const busOperator = await this.findByPk(busOperatorId);
      if (!busOperator) {
        throw new Error('Bus operator not found');
      }
      await busOperator.destroy();
      return busOperator
    }
    async getBusOperatorById(busOperatorId) {
      return await this.findByPk(busOperatorId);
    }
    async getAllBusOperators() {
      return await this.findAll();
    }
  
    static associate(models) {
      // define association here
    }
  }

  Bus_operator.init({
    bus_operator_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    contact: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bus_operator',
  });
  return Bus_operator;
};