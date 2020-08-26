'use strict';
module.exports = (sequelize, DataTypes) => {
  const candidate_date_status = sequelize.define('candidate_date_status', {
    user_id: DataTypes.INTEGER,
    candidate_date_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    underscored: true,
    freezeTableName: true,
    timestamps: false
  });
  candidate_date_status.associate = function(models) {
    // associations can be defined here
    candidate_date_status.belongsTo(models.chousei_user, { as: 'user', constraints: false });
    candidate_date_status.belongsTo(models.candidate_date, { as: 'candidate_date', constraints: false });
  };
  return candidate_date_status;
};