
const {
  Model,DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Bus_operator extends Model {
    static async createBusOperator(data) {
      const busOperatorCreate = await this.create(data);
      return busOperatorCreate;
    }
    static async updateBusOperator(busOperatorId, data) {
      const busOperator = await this.findByPk(busOperatorId);
    
      if (!busOperator) {
        throw new Error('busOperator not found');
      }
    
      await busOperator.update(data);
      return busOperator;
    }
    static async deleteBusOperator(busOperatorId) {
      const busOperator = await this.findByPk(busOperatorId);
      if (!busOperator) {
        throw new Error('busOperator operator not found');
      }
      await busOperator.destroy();
      return busOperator
    }
    static async showOneBusOperator(busOperatorId) {
      return await this.findByPk(busOperatorId);
    }
    static async showAllBusOperator() {
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