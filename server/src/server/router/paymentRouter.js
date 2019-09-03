const express = require('express');

const {
    paymentOfContests,
} = require('../controllers/paymentController');

const { URL: { API }, ROLE } = require('../utils/consts');

const router = express.Router();

router.put(`${API.PAYMENT}/contest`,
    paymentOfContests
);


module.exports = router;
