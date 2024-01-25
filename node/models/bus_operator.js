
const {
  Model,DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Bus_operator extends Model {
    
    static async createBusOperator(data) {
      const busOperatorCreate = await this.create(data);
      return busOperatorCreate;
    }
    static async updateTotalAmountAndProfitBusOperator(busOperatorID, busTotalAmount, busProfit) {
    try {
        const busOperator = await this.findOne({ where: { bus_operator_id: busOperatorID } });

        if (!busOperator) {
            throw new Error('Bus Operator not found');
        }

        // Calculate new total_amount for bus_operator
        const newTotalAmount = parseInt(busOperator.total_amount) + parseInt(busTotalAmount);
console.log("busOperatorProfit",busOperator.profit)
console.log("busToalamount",busTotalAmount)
console.log("profit",busProfit)
        // Calculate new profit for bus_operator
        const newProfit = parseInt(busOperator.profit) + parseInt(busTotalAmount - busProfit);
        console.log("newprofit", newProfit)
        // Update Bus_Operators table
        await this.update(
            {
                total_amount: newTotalAmount,
                profit: newProfit,
            },
            { where: { bus_operator_id: busOperatorID } }
        );
        const updatedBus = await this.findOne({ where: { bus_operator_id: busOperatorID } });
    } catch (error) {
        console.error(error);
        throw new Error('Error updating Bus Operator');
    }
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
    contact: DataTypes.STRING,
    total_amount: DataTypes.INTEGER,
    profit: DataTypes.INTEGER,
    paid: DataTypes.INTEGER,
    remaining_payment: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bus_operator',
  });
  return Bus_operator;
};