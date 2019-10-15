const {
    paymentContestSchema,
    paymentEntrySchema
} = require( '../../utils/yupSchemas/bankSchemas');

const {
    TYPE_OF_PAYMENT:{
        CONTEST,
    }
} = require("../../constants");

const validateDataOnPayment = (type) => async (req, res, next) => {
    const { paymentData } = req.body;
    try {

        if(type === CONTEST){
            req.body.paymentData = await paymentContestSchema.validate(paymentData, {stripUnknown: true});
        }else{
            req.body.paymentData = await paymentEntrySchema.validate(paymentData, {stripUnknown: true});
        }

        next()

    } catch (e) {
        next(e);
    }
};

module.exports = {
    validateDataOnPayment
};
