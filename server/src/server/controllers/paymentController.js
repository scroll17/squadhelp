const error = require("../errors/errors");
const { Bank } = require('../models');

const db = require('../models');

const { SQUAD_HELP_BANK_CARD } = require('../constants');

module.exports.paymentOfContests = async (req, res, next) => {

    console.log('paymentOfContests')

    const { paymentData } = req.body;
    const targetNumber = SQUAD_HELP_BANK_CARD.number;

    console.log('paymentData', paymentData)

    try {

        const [updatedRows, rows] = await Bank.update(
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
                fields: ['balance'],
                returning: true,
            }
        );



        console.log('updatedRows', updatedRows)


        res.send("OK")

        //return next(new error.BadRequest())


    }catch (e) {

    }

};





    // {
    //     updatedRows: updatedRows,
    //         rows: rows
    // }

