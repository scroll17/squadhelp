'use strict';

const { CONTEST_TYPE, CONTEST_STATUS } = require('../constants');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Contests', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            contestId: {
                type: Sequelize.UUID,
                onDelete: 'CASCADE',
                allowNull: false,
            },
            userId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    key: 'id',
                    model: 'Users'
                },
                allowNull: false,
            },
            contestType: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    isIn: Object.values(CONTEST_TYPE)
                },
            },
            priority: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true,
                validate: {
                    notEmpty: false,
                },
            },
            status:{
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    isIn: Object.values(CONTEST_STATUS)
                },
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            type: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                allowNull: true,
                validate: {
                    isIn: ["Company", "Product", 'Project']
                },
            },
            typeOfVenture: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            whatVentureDoes: {
                type: Sequelize.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            targetCustomers: {
                type: Sequelize.TEXT,
                allowNull: true,
                validate: {
                    notEmpty: false,
                },
            },
            style: {
                type:  Sequelize.ARRAY(Sequelize.STRING),
                allowNull: true
            },
            file: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            }

        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Contests');
    }
};