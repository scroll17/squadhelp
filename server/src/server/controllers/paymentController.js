const error = require("../errors/errors");
const { Bank, sequelize } = require('../models');

const db = require('../models');

const { SQUAD_HELP_BANK_CARD, HTTP_CODE: { SUCCESS } } = require('../constants');

module.exports.paymentOfContests = async (req, res, next) => {
    const { paymentData } = req.body;
    const targetNumber = SQUAD_HELP_BANK_CARD.number;

    try {
        let transaction = await sequelize.transaction();

        const updatedRows = await Bank.update(
            {
                balance: db.sequelize.literal(`CASE WHEN "number"='${targetNumber}' THEN "balance"+${paymentData.sum} ELSE "balance"-${paymentData.sum} END`)
            },
            {
                where: {
                    $or: [
                        {
                            number: targetNumber
                        },
                        {
                            number: paymentData.number,
                            expiry: paymentData.expiry,
                            cvc: paymentData.cvc,
                            balance: {
                                $gte: paymentData.sum
                            }
                        }
                    ]
                },
                transaction,
                fields: ['balance']
            }
        );

        if(updatedRows[0] === 2){
            await transaction.commit();
            res.status(SUCCESS.ACCEPTED.CODE).send('Paid')
        }else{
            await transaction.rollback();
            return next(new error.BadRequest())
        }

    }catch (e) {
        next(e)
    }
};
