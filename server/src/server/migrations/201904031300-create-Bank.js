'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Banks', {
            number: {
                primaryKey: true,
                type: Sequelize.STRING,
                unique: true,
            },
            expiry:{
                type: Sequelize.STRING,
                allowNull: false,
            },
            cvc:{
                type:Sequelize.STRING,
                allowNull:false,
            },
            balance: {
                type: Sequelize.FLOAT,
                defaultValue: 750.00,
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Banks');
    }
};
