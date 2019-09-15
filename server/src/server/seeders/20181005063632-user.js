const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Admin',
        lastName: '1',
        displayName: "First",
        email: 'Admin@gmail.com',
        password: bcrypt.hashSync('admin', bcrypt.genSaltSync(8)),
        role: "admin",
        avatar: '1.jpeg',
        isBanned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Creative',
        lastName: '0',
        displayName: "Creative",
        email: 'Creative@gmail.com',
        password: bcrypt.hashSync('creative', bcrypt.genSaltSync(8)),
        role: "creative",
        avatar: '2.jpeg',
        isBanned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Buyer',
        lastName: '00',
        displayName: "Buyer",
        email: 'Buyer@gmail.com',
        password: bcrypt.hashSync('buyer', bcrypt.genSaltSync(8)),
        role: "buyer",
        avatar: '3.jpeg',
        isBanned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {},
};
