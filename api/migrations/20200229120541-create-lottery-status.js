'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lottery_status', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      candidate_date_id: {
        type: Sequelize.INTEGER
      },
      candidate_time_from: {
        type: Sequelize.DATE
      },
      candidate_time_to: {
        type: Sequelize.DATE
      },
      lottery_status: {
        type: Sequelize.STRING
      },
      lottery_status_magnification: {
        type: Sequelize.DOUBLE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('lottery_status');
  }
};