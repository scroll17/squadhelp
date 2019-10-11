const express = require('express');

const getTheAmountOfContests = require("../middlewares/contest/getTheAmountOfContests");

const findUserById = require("../middlewares/user/findUserById");
const checkUserBalance = require("../middlewares/payment/checkUserBalance");

const {
    paymentOfContests,
    getPaymentOfEntries,
    cashOutUserBalance
} = require('../controllers/paymentController');


const { URL: { API }, SOURCE_ID } = require('../constants');

const router = express.Router();

router.post(API.CONTEST,
    getTheAmountOfContests,
    paymentOfContests
);

router.post(API.ENTRY,
    findUserById(SOURCE_ID.PAYLOAD),
    checkUserBalance,
    cashOutUserBalance,
    getPaymentOfEntries
);

module.exports = router;
