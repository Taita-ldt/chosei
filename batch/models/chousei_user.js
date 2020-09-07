'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('chousei_user', {
    name: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    underscored: true,
    freezeTableName: true,
    timestamps: false
  });
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.candidate_date_status, { foreignKey: 'user_id' });
  };
  return user;
};