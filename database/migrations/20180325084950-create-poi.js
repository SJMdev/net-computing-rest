'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('POIs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      creatorId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      expirationDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      latitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: null,
        validate: { min: -90, max: 90 }
      },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: null,
        validate: { min: -180, max: 180 }
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
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
    return queryInterface.dropTable('POIs');
  }
};