const {
    CONTEST_TYPE,
    CONTEST_STATUS,
    TYPE_OF_SCOPE: {
        CLEAN_SEARCH,
        UPDATE
    }
} = require('../constants');

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
                isIn: [[...Object.values(CONTEST_TYPE)]]
            },
        },
        priority: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        status:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [[...Object.values(CONTEST_STATUS)]]
            }
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
            type:  DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        file: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });


    Contests.associate = function (models) {
        Contests.hasMany(models.Entries, {foreignKey: 'contestId', targetKey: 'id'});
        Contests.belongsTo(models.User, {foreignKey: 'userId', targetKey: 'id'})
    };


    Contests.addScope(CLEAN_SEARCH, {
        attributes: {
            exclude: ['updatedAt', 'createdAt']
        },
        raw: true,
        order: [['id', 'DESC']]
    });

    Contests.addScope(UPDATE, {
        returning: true,
        raw: true
    });


    return Contests;
};