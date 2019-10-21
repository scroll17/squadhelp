
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Entries', [
      {
        userId: 2,
        contestId: 1,
        text : 'Test Entriesss',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        contestId: 2,
        file : '/123123123_20181005063710-entries.js',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {},
};
