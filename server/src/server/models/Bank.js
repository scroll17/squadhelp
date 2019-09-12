module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Bank', {
        number: {
            primaryKey: true,
            type: DataTypes.STRING,
            unique: true,
        },
        expiry: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cvc: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        balance: {
            type: DataTypes.FLOAT,
        },
    });
};
