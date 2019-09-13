'use strict';
const { ENTRIES_STATUS } = require('../constants');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Entries', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
                references: {
                    model: 'Users',
                    key: 'id'
                },
                allowNull: false,
            },
            contestId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                onUpdate: "CASCADE",
                references: {
                    model: 'Contests',
                    key: 'id'
                },
                allowNull: false,
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    isIn:  [[...Object.values(ENTRIES_STATUS)]]
                },
                defaultValue: ENTRIES_STATUS.EXPECTATION,
            },
            isValid: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            text: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            file: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,

        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Entries');
    }
};
