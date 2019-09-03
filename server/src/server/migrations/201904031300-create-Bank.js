'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Banks', {
            number: {
                primaryKey: true,
                type: Sequelize.STRING,
                unique: true,
                validate: {
                    is: ["^[0-9]\ d{16}"]
                }
            },
            expiry:{
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    is: ["^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$"],
                },
            },
            cvc:{
                type:Sequelize.STRING,
                allowNull:false,
                validate: {
                    is: ["^[0-9]{3,4}$"],
                },
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
