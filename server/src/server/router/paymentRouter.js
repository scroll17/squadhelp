const express = require('express');

const getTheAmountOfContests = require("../middlewares/contest/getTheAmountOfContests");

const findUserById = require("../middlewares/user/findUserById");
const checkUserBalance = require("../middlewares/payment/checkUserBalance");

const {
    paymentOfContests,
    getPaymentOfEntries,
    cashOutUserBalance
} = require('../controllers/paymentController');

const {
    validateDataOnPayment
} = require('../middlewares/validate/validatePayment');

const {
    URL: {
        API
    },
    SOURCE_ID,
    TYPE_OF_PAYMENT:{
        ENTRY,
        CONTEST
    }
} = require('../constants');

const router = express.Router();

router.post(API.CONTEST,
    validateDataOnPayment(CONTEST),
    getTheAmountOfContests,
    paymentOfContests
);

router.post(API.ENTRY,
    validateDataOnPayment(ENTRY),
    findUserById(SOURCE_ID.PAYLOAD),
    checkUserBalance,
    cashOutUserBalance,
    getPaymentOfEntries
);

module.exports = router;
