const { CONTEST_TYPE } = require('../constants');

module.exports = (sequelize, DataTypes) => {
    const Contests = sequelize.define('Contests', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        contestId: {
            type: DataTypes.UUID,
            onDelete: 'CASCADE',
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            },
        },
        contestType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: Object.keys(CONTEST_TYPE)
            },
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: false,
            },
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        type: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
            validate: {
                isIn: ["Company", "Product", 'Project']
            },
        },
        typeOfVenture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        whatVentureDoes: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        targetCustomers: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                notEmpty: false,
            },
        },
        style: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        files: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });


    Contests.associate = function (models) {
        Contests.belongsTo(models.User, {foreignKey: 'userId',targetKey: 'id',})
    };

    return Contests;
};