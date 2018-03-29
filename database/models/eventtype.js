'use strict';
module.exports = (sequelize, DataTypes) => {
  var EventType = sequelize.define('EventType', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    type: {
      type: DataTypes.ENUM('POLICE_PATROL', 'ACCIDENT', 'ROADBLOCK'),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    severity: {
      type: DataTypes.ENUM('LOW', 'MEDIUM', 'SEVERE'),
      allowNull: false
    },
  }, {});
  EventType.associate = function(models) {
    EventType.hasOne(models.POI, {
      foreignKey: 'eventTypeId'
    })
  };
  return EventType;
};