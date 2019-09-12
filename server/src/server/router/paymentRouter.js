const express = require('express');

const getTheAmountOfContests = require("../middlewares/contest/getTheAmountOfContests");

const {
    paymentOfContests,
} = require('../controllers/paymentController');

const { URL: { API }, ROLE } = require('../constants');

const router = express.Router();

router.post(API.CONTEST,
    getTheAmountOfContests,
    paymentOfContests
);


module.exports = router;
