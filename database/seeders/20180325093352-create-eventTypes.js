'use strict';
const uuidv4  = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EventTypes', [
      { 
        id: uuidv4(),
        severity: 'MEDIUM',
        type: 'POLICE_PATROL',
        description: 'Police patrol: medium severity',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: uuidv4(),
        severity: 'MEDIUM',
        type: 'ACCIDENT',
        description: 'Accident: medium severity',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: uuidv4(),
        severity: 'MEDIUM',
        type: 'ROADBLOCK',
        description: 'Roadblock: medium severity',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EventTypes', null, {});
  }
};

