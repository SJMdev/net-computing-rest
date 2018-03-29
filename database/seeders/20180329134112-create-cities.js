'use strict';
const uuidv4  = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('BroadcastGroups', [
      { 
        id: uuidv4(),
        left: 6.462600,
        top: 53.264726,
        right: 6.668787,
        bottom: 53.178684,
        city: 'GRONINGEN',
        description: 'Groningen',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: uuidv4(),
        left: 4.728856,
        top: 52.431157,
        right: 5.068390,
        bottom: 52.278139,
        city: 'AMSTERDAM',
        description: 'Amsterdam',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EventTypes', null, {});
  }
};

