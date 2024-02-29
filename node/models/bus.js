const {
  Model,DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  const { Op } = require('sequelize');
  const Bus_operators = require('./bus_operator');
  const Trips = require('./trip')

  class Bus extends Model {
    static async createBus(data) {
      const busCreate = await this.create(data);
      return busCreate;
    }
    static async updateBus(busId, data) {
      const bus = await this.findByPk(busId);
      if (!bus) {
        throw new Error('Bus not found');
      }
      await bus.update(data);
      return bus;
    }
    static async updateTotalAmountAndShareDeductedBus(busID, data) {
      try {
        console.log("Updating bus with ID:", busID);
        const bus = await this.findOne({ where: { id: busID } }); 
        if (!bus) {
          throw new Error('Bus not found');
        }
        
        // Calculate new total_amount
        const newTotalAmount = parseInt(bus.total_amount, 10) + parseInt(data, 10);
        // Calculate share_deducted_amount
        const newShareDeductedAmount = newTotalAmount - (newTotalAmount * parseInt(bus.share)) / 100;    
        // Update Buses table
        console.log(newTotalAmount,newShareDeductedAmount)
        await this.update(
          {
            total_amount: newTotalAmount,
            share_deducted_amount: newShareDeductedAmount,
          },
          { where: { id: busID } }
        );
        console.log("Bus updated successfully. updateTotalAmountAndShareDeductedBus");
        // Fetch the updated bus
        const updatedBus = await this.findOne({ where: { id: busID } });
        return updatedBus;
      } catch (error) {
        console.error("Error updating bus:", error);
        throw error; // Rethrow the error for proper handling
      }
    }
    static async updateTotalAmountAndShareDeductedBusOnUpdate(busID, newData, oldData) {
      try {
        const bus = await this.findOne({ where: { id: busID } });
        if (!bus) {
          throw new Error('Bus not found');
        }
        const dataChange = parseInt(newData) - parseInt(oldData);
        const newTotalAmount = parseInt(bus.total_amount) + dataChange;
        const newShareDeductedAmount = newTotalAmount - (newTotalAmount * parseInt(bus.share)) / 100;
        await this.update(
          {
            total_amount: newTotalAmount,
            share_deducted_amount: newShareDeductedAmount,
          },
          { where: { id: busID } }
        );
        console.log("Bus updated successfully. updateTotalAmountAndShareDeductedBusOnUpdate");
        const updatedBus = await this.findOne({ where: { id: busID } });
        return updatedBus;
      } catch (error) {
        console.error("Error updating bus:", error);
        throw error; // Rethrow the error for proper handling
      }
    }
    static async updateOldTaAndSda(bus_id,total_amount)
    {
      const bus = await this.findOne({ where: { id: bus_id } });
      const subtractedOldTotalAmount = parseInt(bus.total_amount)-total_amount
      const subtractedOldSDA = subtractedOldTotalAmount-(subtractedOldTotalAmount*parseInt(bus.share)/100)
      await this.update(
        {
          total_amount: subtractedOldTotalAmount,
          share_deducted_amount: subtractedOldSDA,
        },
        { where: { id: bus_id } }
      );
      const updatedBus = await this.findOne({ where: { id: bus_id } });
        return updatedBus;
    }
    static async updatedNewTaAndSdaBus(bus_id,total_amount)
    {
      const bus = await this.findOne({ where: { id: bus_id } });
      const addNewTotalAmount = parseInt(bus.total_amount)+total_amount
      const addNewSDA = addNewTotalAmount-(addNewTotalAmount*parseInt(bus.share)/100)
      await this.update(
        {
          total_amount: addNewTotalAmount,
          share_deducted_amount: addNewSDA,
        },
        { where: { id: bus_id } }
      );
      const updatedBus = await this.findOne({ where: { id: bus_id } });
        return updatedBus;
    }
    static async deleteBus(busId) {
      const bus = await this.findByPk(busId);
      if (!bus) {
        throw new Error('Bus not found');
      }
      await bus.destroy();
      return bus
    }
    static async showOneBus(busId) {
      return await this.findByPk(busId);
    }
    static async showAllBus(page, size, search, keyword) {
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

      // define association here
    }
  }
  Bus.init({
    bus_operator_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    share: DataTypes.INTEGER,
    total_amount: DataTypes.INTEGER,
    share_deducted_amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bus',
  });
  return Bus;
};
