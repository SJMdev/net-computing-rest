'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      unique: true
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null,
      validate: { min: -90, max: 90 }
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null,
      validate: { min: -180, max: 180 }
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: true,
      isIP: true
    },
    broadcastGroupId: {
      type: DataTypes.UUID,
      allowNull: true
    },
  }, {});
  User.associate = function(models) {
    
    User.belongsTo(models.BroadcastGroup, {
      foreignKey: 'broadcastGroupId',
      allowNull: false
    })

  };
  return User;
};