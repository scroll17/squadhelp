'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Contests', [
            {
                contestId: '0d915310-ca6b-11e9-a468-93978114f0f1',
                userId: 3,
                contestType: 'name',
                title: "Test contest name",
                name: "Test contest name",
                price: 33,
                type: ['Company', 'Product'],
                typeOfVenture: "test type of industry",
                whatVentureDoes: "test target customers",
                targetCustomers: "test description",
                style: ['Professional'],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                contestId: '0d915310-ca6b-11e9-a468-93978114f0f1',
                userId: 3,
                contestType: 'logo',
                title: "Test contest name",
                name: "Test contest name",
                price: 33,
                type: ['Company', 'Product'],
                typeOfVenture: "test type of industry",
                whatVentureDoes: "test target customers",
                targetCustomers: "test description",
                style: ['normal style'],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {},
};
