
const {
  Model,DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  const { Op } = require('sequelize');

  class Bus_operator extends Model {
    
    static async createBusOperator(data) {
      const busOperatorCreate = await this.create(data);
      return busOperatorCreate;
    }
    static async updateTotalAmountAndProfitBusOperator(busOperatorID, busTotalAmountChange, busProfitChange) {
    try {
        const busOperator = await this.findOne({ where: { id: busOperatorID } });

        if (!busOperator) {
            throw new Error('Bus Operator not found');
        }
        // Calculate new total_amount for bus_operator
        const newTotalAmount = parseInt(busOperator.total_amount) + parseInt(busTotalAmountChange);
        // Calculate new profit for bus_operator
        const newProfit = parseInt(busOperator.profit) + busProfitChange
        // console.log("newprofit", newProfit)
        // Update Bus_Operators table
        await this.update(
            {
                total_amount: newTotalAmount,
                profit: newProfit,
            },
            { where: { id: busOperatorID } }
        );
        const updatedBus = await this.findOne({ where: { id: busOperatorID } });
        // console.log("updated bus",updatedBus)
    } catch (error) {
        console.error(error);
        throw new Error('Error updating Bus Operator');
    }
}
static async updateTotalAmountAndProfitBusOperatorOnUpdate(busOperatorID, totalAmountChange,profitChange ) {
  try {
    const busOperator = await this.findOne({ where: { id: busOperatorID } })
    if (!busOperator) {
      throw new Error('Bus Operator not found');
    }
    const newTotalAmount = busOperator.total_amount + totalAmountChange
    const newProfit = busOperator.profit +profitChange
    console.log(".")
    console.log("..",totalAmountChange)
    console.log("..",profitChange)

    console.log("..",newTotalAmount)
    console.log("..",newProfit)
    console.log(".")
    await this.update(
      {
        total_amount: newTotalAmount,
        profit: newProfit,
      },
      { where: { id: busOperatorID } }
    );
    console.log("Bus operator updated successfully. updateTotalAmountAndProfitBusOperatorOnUpdate");
    const updatedBusOperator = await this.findOne({ where: { id: busOperatorID } });
    return updatedBusOperator;
  } catch (error) {
    console.error("Error updating bus operator:", error);
    throw new Error('Error updating Bus Operator');
  }
}

  static async updateOldTaAndProfitBusOperator(operator_id,total_amount,oldOperatorProfit)
  {
    const operator = await this.findOne({ where: { id: operator_id } });
    const substractOldTotalAmount = parseInt(operator.total_amount)-total_amount
    const substractProfit = parseInt(operator.profit)-oldOperatorProfit
    await this.update(
      {
        total_amount: substractOldTotalAmount,
        profit: substractProfit,
      },
      { where: { id: operator_id } }
    );
    console.log("Bus operator updated successfully updateOldTaAndProfitBusOperator.");
    const updatedBusOperator = await this.findOne({ where: { id: operator_id } });
    return updatedBusOperator;
  }
  static async updatedNewTaAndProfitBusOperator(operator_id,total_amount,newOperatorProfit)
  {
    const operator = await this.findOne({ where: { id: operator_id } });
    const addNewTotalAmount = parseInt(operator.total_amount)+total_amount
    const addNewProfit = parseInt(operator.profit)+newOperatorProfit
    await this.update(
      {
        total_amount: addNewTotalAmount,
        profit: addNewProfit,
      },
      { where: { id: operator_id } }
    );
  }
  static async updateProfitBusOperator(operator_id,totalChange,profitChange)
  {
    const operator = await this.findOne({ where: { id: operator_id } });
    const newTotalAmount = parseInt(operator.total_amount) + totalChange
    const profit = parseInt(operator.profit)+profitChange
    
    await this.update(
      {
        total_amount:newTotalAmount,
        profit: profit,
      },
      { where: { id: operator_id } }
    );

    
    console.log("Bus operator updated successfully. updateProfitBusOperator");
    const updatedBusOperator = await this.findOne({ where: { id: operator_id } });
    console.log("....",updatedBusOperator);

    return updatedBusOperator;
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
    static async showAllBusOperator(page, size,search,keyword) {
      if (page || size) {
        const offset = page * size; // Calculate the offset for pagination
        try {
          if(search && keyword)
          {
            let whereClause = {}
            whereClause[search] = { [Op.like]: `%${keyword}%` }
            const result =await this.findAndCountAll({
              where: whereClause,
              limit: size,
              offset: offset,
              order: [['id', 'DESC']] 
            })
            return result
          }
        else{
          const result = await this.findAndCountAll({
            limit: size,
            offset: offset,
            order: [['id', 'DESC']] 
          });
      
          return result;
        }
        } catch (error) {
          // Handle errors appropriately
          console.error('Error fetching data:', error);
          throw error; // Rethrow the error to be handled by the caller
        }
      } else {
        const result = await this.findAll({
          order: [['id', 'DESC']] // Order by id in ascending order
        });
        return result;
      }
    }
    
    
    static associate(models) {

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