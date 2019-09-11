const express = require('express');

const {
    getContestById
} = require('../controllers/dashboardController');


const router = express.Router();

const { URL: { API } } = require('../constants');

router.get(`${API.CONTESTS}/:id`,
    getContestById,
);

module.exports = router;
