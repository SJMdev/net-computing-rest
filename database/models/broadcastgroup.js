'use strict';
module.exports = (sequelize, DataTypes) => {
  var BroadcastGroup = sequelize.define('BroadcastGroup', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    left: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null,
      validate: { min: -180, max: 180 }
    },
    top: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null,
      validate: { min: -90, max: 90 }
    },
    right: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null,
      validate: { min: -180, max: 180 }
    },
    bottom: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null,
      validate: { min: -90, max: 90 }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.ENUM('GRONINGEN', 'AMSTERDAM', 'OTHER'),
      allowNull: false,
    },
  }, {});
  BroadcastGroup.associate = function(models) {
    BroadcastGroup.hasOne(models.User, {
      foreignKey: 'broadcastGroupId',
      allowNull: false
    })

    BroadcastGroup.hasOne(models.POI, {
      foreignKey: 'broadcastGroupId',
      allowNull: false
    })
  };
  return BroadcastGroup;
};