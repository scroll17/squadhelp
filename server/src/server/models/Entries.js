const { ENTRIES_STATUS, ENTRY_VALIDATION_STATUS  } = require('../constants');

module.exports = (sequelize, DataTypes) => {
    const Entries = sequelize.define('Entries', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            },
            allowNull: false,
        },
        contestId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Contests',
                key: 'id'
            },
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [[...Object.values(ENTRIES_STATUS)]]
            },
            defaultValue: ENTRIES_STATUS.EXPECTATION,
        },
        isValid: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [[...Object.values(ENTRY_VALIDATION_STATUS)]]
            },
            defaultValue: ENTRY_VALIDATION_STATUS.PENDING,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        file: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });


    Entries.associate = function (models) {
        Entries.belongsTo(models.Contests, {foreignKey: 'contestId', targetKey: 'id', as: 'contestInfo'});
        Entries.belongsTo(models.User, {foreignKey: 'userId', targetKey: 'id'});
    };
    return Entries;
};
