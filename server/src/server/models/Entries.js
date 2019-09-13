const { ENTRIES_STATUS } = require('../constants');

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
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
        Entries.belongsTo(models.Contests, {foreignKey: 'contestId', targetKey: 'id', as: 'contests'});
        Entries.belongsTo(models.User, {foreignKey: 'userId', targetKey: 'id', as: 'user'});
    };
    return Entries;
};
