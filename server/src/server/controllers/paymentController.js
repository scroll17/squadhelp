const error = require("../errors/errors");
const { Bank, sequelize } = require('../models');

const {
    SQUAD_HELP_BANK_CARD,
    HTTP_CODE: {
        SUCCESS
    }
} = require('../constants');

const transactionRollAndSendBadReq = require("../utils/transactionRollAndSendBadReq");

const omit = require("lodash/omit");

module.exports.paymentOfContests = async (req, res, next) => {
    const {
        paymentData
    } = req.body;

    const targetNumber = SQUAD_HELP_BANK_CARD.number;

    const { sum } = paymentData;
    const bankData = omit(paymentData, ["sum"]);

    try {
        let transaction = await sequelize.transaction();

        const updateFields = Bank.createUpdateFields(targetNumber, sum);
        const updateOptions = Bank.createUpdateOptions(targetNumber, sum, bankData);

        const [ updatedRows ] = await Bank.update(
            updateFields,
            updateOptions
        );

        if(updatedRows === 2){
            await transaction.commit();
            res.status(SUCCESS.ACCEPTED.CODE).send(updateOptions)
        }else{
            return await transactionRollAndSendBadReq(transaction, next);
        }

    }catch (e) {
        next(e)
    }
};

module.exports.paymentOfEntry = async (req, res, next) => {
    const {
        paymentData
    } = req.body;

    const  = SQUAD_HELP_BANK_CARD.number;

    const { sum } = paymentData;
    const bankData = omit(paymentData, ["sum"]);

    try {
        let transaction = await sequelize.transaction();

        const updateFields = Bank.createUpdateFields(targetNumber, sum);
        const updateOptions = Bank.createUpdateOptions(targetNumber, sum, SQUAD_HELP_BANK_CARD);

        const [ updatedRows ] = await Bank.update(
            updateFields,
            updateOptions
        );

        if(updatedRows === 2){
            await transaction.commit();
            res.status(SUCCESS.ACCEPTED.CODE).send(updateOptions)
        }else{
            return await transactionRollAndSendBadReq(transaction, next);
        }

    }catch (e) {
        next(e)
    }
};