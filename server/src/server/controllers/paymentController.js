const { Bank, User, sequelize } = require('../models');

const {
    SQUAD_HELP_BANK_CARD,
    ABILITY: {
        ACTIONS,
        SUBJECT
    },
    TYPE_OF_UPDATE_BALANCE_FOR_USER
} = require('../constants');

const {
    CREATED,
    ACCEPTED
} = require('http-status-codes');

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
        req.ability.throwUnlessCan(ACTIONS.PAY, SUBJECT.BANKS);

        let transaction = await sequelize.transaction();

        const [updateOptions, updateFields] = Bank.createUpdateOptions(targetNumber, sum, bankData, transaction);

        const [ updatedRows ] = await Bank.update(
            updateFields,
            updateOptions
        );

        if(updatedRows === 2){
            await transaction.commit();
            res.status(ACCEPTED).send("Paid !")
        }else{
            return await transactionRollAndSendBadReq(transaction, next);
        }

    }catch (e) {
        next(e)
    }
};

module.exports.getPaymentOfEntries = async (req, res, next) => {
    const { paymentData: {
        sum, number
    }} = req.body;

    const { transaction } = req;

    try {
        const [updateOptions, updateFields] = Bank.createUpdateOptions(number, sum, SQUAD_HELP_BANK_CARD, transaction);

        const [ updatedRows ] = await Bank.update(
            updateFields,
            updateOptions
        );

        if(updatedRows === 2){
            await transaction.commit();
            res.status(ACCEPTED).send(`Cash out ${sum}$!`)
        }else{
            return await transactionRollAndSendBadReq(transaction, next);
        }

    }catch (e) {
        next(e)
    }
};

module.exports.cashOutUserBalance = async (req,res,next) => {
    const { paymentData, user } = req.body;

    try{

        req.ability.throwUnlessCan(ACTIONS.CASH_OUT, SUBJECT.BANKS);

        let transaction = await sequelize.transaction();

        const [updateField, updateOptions] = User.createUpdateBalanceOptions(
            TYPE_OF_UPDATE_BALANCE_FOR_USER.CASH_OUT,
            user.id,
            paymentData.sum,
            transaction
        );

        const [ numberOfUpdatedRows ] = await User.update(
            updateField,
            updateOptions
        );

        if(numberOfUpdatedRows !== 1){
            return await transactionRollAndSendBadReq(transaction, next);
        }

        req.transaction = transaction;
        next()

    }catch (err) {
        next(err)
    }
};

module.exports.increaseUserBalance = async (req,res,next) => {
    const {
        transaction,
    } = req;

    const {
        contestPrice,
        updateData: {
            userId
        }
    } = req.body;

    try{

        const [updateField, updateOptions] = User.createUpdateBalanceOptions(
            TYPE_OF_UPDATE_BALANCE_FOR_USER.REPLENISH,
            userId,
            contestPrice,
            transaction
        );

        const [ numberOfUpdatedRows ] = await User.update(
            updateField,
            updateOptions
        );

        if(numberOfUpdatedRows !== 1){
            return await transactionRollAndSendBadReq(transaction, next);
        }

        await transaction.commit();
        res.status(CREATED).send("Contest closed!")

    }catch (err) {
        next(err)
    }
};