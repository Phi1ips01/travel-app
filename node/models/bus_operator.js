
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
        const busOperator = await this.findOne({ where: { id: busOperatorID } });

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
            { where: { id: busOperatorID } }
        );
        const updatedBus = await this.findOne({ where: { id: busOperatorID } });
    } catch (error) {
        console.error(error);
        throw new Error('Error updating Bus Operator');
    }
}
static async updateTotalAmountAndProfitBusOperatorOnUpdate(busOperatorID, newBusTotalAmount, newBusProfit, oldBusTotalAmount, oldBusProfit) {
  try {
    console.log("Updating bus operator with ID:", busOperatorID);

    // Find the bus operator by ID
    const busOperator = await this.findOne({ where: { id: busOperatorID } });

    if (!busOperator) {
      throw new Error('Bus Operator not found');
    }

    console.log("Existing total_amount:", busOperator.total_amount);
    console.log("Existing profit:", busOperator.profit);
    console.log("New bus total amount:", newBusTotalAmount);
    console.log("New bus profit:", newBusProfit);

    // Calculate the changes in total amount and profit
    const totalAmountChange = parseInt(newBusTotalAmount, 10) - parseInt(oldBusTotalAmount, 10);
    const profitChange = parseInt(newBusProfit, 10) - parseInt(oldBusProfit, 10);

    // Calculate new total_amount for bus operator
    const newTotalAmount = parseInt(busOperator.total_amount) + totalAmountChange;

    // Calculate new profit for bus operator
    const newProfit = parseInt(busOperator.profit) + profitChange;

    console.log("New total_amount for bus operator:", newTotalAmount);
    console.log("New profit for bus operator:", newProfit);

    // Update Bus_Operators table
    await this.update(
      {
        total_amount: newTotalAmount,
        profit: newProfit,
      },
      { where: { id: busOperatorID } }
    );

    console.log("Bus operator updated successfully.");

    // Fetch the updated bus operator
    const updatedBusOperator = await this.findOne({ where: { id: busOperatorID } });

    return updatedBusOperator;
  } catch (error) {
    console.error("Error updating bus operator:", error);
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
      return await this.findAll({
        order: [['id', 'DESC']] // Replace 'columnName' with the actual column name you want to sort by
      });
    }
    
    static associate(models) {
      // define association here
    }
  }

  Bus_operator.init({
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