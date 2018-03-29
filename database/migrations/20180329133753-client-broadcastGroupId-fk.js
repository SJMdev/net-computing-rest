'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'broadcastGroupId',
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
    return queryInterface.removeColumn('Users', 'broadcastGroupId', {});
  }
};
