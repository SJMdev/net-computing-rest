'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('POIs', 'eventTypeId',
      {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'EventTypes',
          key: 'id'
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('POIs', 'eventTypeId', {});
  }
};
