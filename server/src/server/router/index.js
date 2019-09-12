import express from 'express';

const bearerToken = require('express-bearer-token');
const defineAbilities = require('../middlewares/defineAbilities');


import userRouter from './userRouter';
import adminRouter from './adminRouter';
import contestRouter from './contestRouter';
import dashboardRouter from './dashboardRouter';

import paymentRouter from './paymentRouter';


const router = express.Router();

router.use(bearerToken());
router.use(defineAbilities);


router.use('/user', userRouter);
router.use('/admin', adminRouter);
router.use('/contest', contestRouter);
router.use('/dashboard', dashboardRouter);
router.use('/payment', paymentRouter);


module.exports = router;

