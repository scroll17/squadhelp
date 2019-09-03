import express from 'express';

const bearerToken = require('express-bearer-token');
const defineAbilities = require('../middlewares/defineAbilities');


import authorizationRouter from './authorizationRouter';
import userRouter from './userRouter';
import contestRouter from './contestRouter';
import paymentRouter from './paymentRouter';


const router = express.Router();

router.use(bearerToken());
router.use(defineAbilities);


router.use(
    authorizationRouter,
    userRouter,
    contestRouter,
    paymentRouter
);


module.exports = router;

