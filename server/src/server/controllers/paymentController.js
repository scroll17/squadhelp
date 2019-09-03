const error = require("../errors/errors");
const { Bank } = require('../models');

const db = require('../models');
const Op = db.sequelize.Op;

const { SQUAD_HELP_BANK_CARD } = require('../utils/consts');

module.exports.paymentOfContests = async (req, res, next) => {
    //const
    try {
        const [updatedRows, rows] = await Bank.update(
            {
                balance: db.sequelize.literal(`CASE WHEN "number"='${targetNumber}' THEN "balance"+${sum} ELSE "balance"-${sum} END`)
            },
            {
                where: {
                    [Op.or]: [
                        {
                            number: targetNumber
                        },
                        {
                            number: body.number,
                            expiry: body.expiry,
                            cvc: body.cvc,
                            balance: {
                                [Op.gte]: sum
                            }
                        }
                    ]
                },
                fields: ['balance'],
                returning: true,
                plain: true,
            }
        );

        res.send({
            updatedRows: updatedRows,
            rows: rows
        })
    } catch (err) {
        next(err);
    }
};
