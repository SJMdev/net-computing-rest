'use strict';
module.exports = (sequelize, DataTypes) => {
  var POI = sequelize.define('POI', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    creatorId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    expirationDate: {
      allowNull: false,
      type: DataTypes.DATE
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
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {});
  POI.associate = function(models) {
    POI.belongsTo(models.EventType, {
      foreignKey: 'eventTypeId'
    })

    POI.belongsTo(models.BroadcastGroup, {
      foreignKey: 'broadcastGroupId',
      allowNull: false
    })
  };
  return POI;
};