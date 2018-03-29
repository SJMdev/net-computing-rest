'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BroadcastGroups', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      left: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: null,
        validate: { min: -180, max: 180 }
      },
      top: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: null,
        validate: { min: -90, max: 90 }
      },
      right: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: null,
        validate: { min: -180, max: 180 }
      },
      bottom: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: null,
        validate: { min: -90, max: 90 }
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.ENUM('GRONINGEN', 'AMSTERDAM', 'OTHER'),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BroadcastGroups');
  }
};