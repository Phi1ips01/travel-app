const {
  Model,DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
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
    
        // Find the bus by ID
        const bus = await this.findOne({ where: { id: busID } });
    
        if (!bus) {
          throw new Error('Bus not found');
        }
    
        console.log("Existing total_amount:", bus.total_amount);
        console.log("Data to be added:", data);
    
        // Calculate new total_amount
        const newTotalAmount = parseInt(bus.total_amount, 10) + parseInt(data, 10);
    
        // Calculate share_deducted_amount
        const newShareDeductedAmount = newTotalAmount - (newTotalAmount * bus.share) / 100;
    
        console.log("New total_amount:", newTotalAmount);
        console.log("New share_deducted_amount:", newShareDeductedAmount);
    
        // Update Buses table
        await this.update(
          {
            total_amount: newTotalAmount,
            share_deducted_amount: newShareDeductedAmount,
          },
          { where: { id: busID } }
        );
    
        console.log("Bus updated successfully.");
        
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
        console.log("Updating bus with ID:", busID);
    
        // Find the bus by ID
        const bus = await this.findOne({ where: { id: busID } });
    
        if (!bus) {
          throw new Error('Bus not found');
        }
    
        console.log("Existing total_amount:", bus.total_amount);
        console.log("Data before update:", oldData);
        console.log("Data after update:", newData);
    
        // Calculate the change in data
        const dataChange = parseInt(newData, 10) - parseInt(oldData, 10);
    
        // Calculate new total_amount
        const newTotalAmount = parseInt(bus.total_amount, 10) + dataChange;
    
        // Calculate share_deducted_amount
        const newShareDeductedAmount = newTotalAmount - (newTotalAmount * bus.share) / 100;
    
        console.log("New total_amount:", newTotalAmount);
        console.log("New share_deducted_amount:", newShareDeductedAmount);
    
        // Update Buses table
        await this.update(
          {
            total_amount: newTotalAmount,
            share_deducted_amount: newShareDeductedAmount,
          },
          { where: { id: busID } }
        );
    
        console.log("Bus updated successfully.");
    
        // Fetch the updated bus
        const updatedBus = await this.findOne({ where: { id: busID } });
    
        return updatedBus;
      } catch (error) {
        console.error("Error updating bus:", error);
        throw error; // Rethrow the error for proper handling
      }
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
    static async showAllBus(page, size) {
      if (page || size) {
      const offset = page * size; // Calculate the offset for pagination
    
      try {
        const result = await this.findAndCountAll({
          limit: size,
          offset: offset,
          order: [['id', 'DESC']] // Replace 'columnName' with the actual column name you want to sort by
        });
    
        return result;
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
  
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Trip, { foreignKey: 'bus_id', as: 'trips' });

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
