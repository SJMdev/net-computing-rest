'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('POIs', 'broadcastGroupId',
      {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'BroadcastGroups',
          key: 'id'
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('POIs', 'broadcastGroupId', {});
  }
};
