const {
  Model,DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
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
          const bus = await this.findOne({ where: { bus_id: busID } });
          if (!bus) {
              throw new Error('Bus not found');
          }
          // Calculate new total_amount
          const newTotalAmount = bus.total_amount + data.total_amount;
          // Calculate share_deducted_amount
          const newShareDeductedAmount = newTotalAmount - (newTotalAmount * bus.share) / 100;
          // Update Buses table
          await this.update(
              {
                  total_amount: newTotalAmount,
                  share_deducted_amount: newShareDeductedAmount,
              },
              { where: { bus_id: busID } }
          );
      } catch (error) {
          console.error(error);
          throw new Error('Error updating Buses');
      }
  }
    static async deleteBus(busId) {
      const bus = await this.findByPk(busId);
      if (!bus) {
        throw new Error('Bus operator not found');
      }
      await bus.destroy();
      return bus
    }
    static async showOneBus(busId) {
      return await this.findByPk(busId);
    }
    static async showAllBus() {
      return await this.findAll();
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
  Bus.init({
    bus_operator_id: DataTypes.INTEGER,
    bus_id: DataTypes.INTEGER,
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
