module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Banks', [
            {
                number: '0000000000000001',
                expiry: '01/25',
                cvc: '120',
            },
            {
                number: '0000000000000002',
                expiry: '01/25',
                cvc: '121',
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {},
};
