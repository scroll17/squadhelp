module.exports = (sequelize, DataTypes) => {
    const Bank = sequelize.define('Bank', {
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


    Bank.createUpdateOptions = (targetNumber, sum, bankDataObject, transaction) => {
        bankDataObject.balance = {
            $gte: sum
        };

        const updateOptions = {
            where: {
                $or: [
                    {
                        number: targetNumber
                    },
                    bankDataObject
                ]
            },
            transaction,
            fields: ['balance']
        };

        const updateFields = {
            balance: sequelize.literal(`CASE WHEN "number"='${targetNumber}' THEN "balance"+${sum} ELSE "balance"-${sum} END`)
        };

        return [updateOptions, updateFields]
    };

    return Bank;
};
