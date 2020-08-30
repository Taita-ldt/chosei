'use strict';
module.exports = (sequelize, DataTypes) => {
  const lottery_status = sequelize.define('lottery_status', {
    candidate_date_id: DataTypes.INTEGER,
    candidate_time_from: DataTypes.DATE,
    candidate_time_to: DataTypes.DATE,
    lottery_status: DataTypes.STRING,
    lottery_status_magnification: DataTypes.DOUBLE
  }, {
    underscored: true,
    freezeTableName: true,
    timestamps: false
  });
  lottery_status.associate = function(models) {
    // associations can be defined here
  };
  return lottery_status;
};