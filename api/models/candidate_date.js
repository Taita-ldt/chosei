'use strict';
module.exports = (sequelize, DataTypes) => {
  const candidate_date = sequelize.define('candidate_date', {
    candidate_date: DataTypes.DATE,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    underscored: true,
    freezeTableName: true,
    timestamps: false
  });
  candidate_date.associate = function(models) {
    // associations can be defined here
    candidate_date.hasMany(models.candidate_date_status, { foreignKey: 'candidate_date_id' });
  };
  return candidate_date;
};