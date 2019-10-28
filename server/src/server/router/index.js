import express from 'express';

const bearerToken = require('express-bearer-token');
const defineAbilities = require('../middlewares/defineAbilities');


import userRouter from './userRouter';
import adminRouter from './adminRouter';
import contestRouter from './contestRouter';
import entriesRouter from './entriesRouter';

import paymentRouter from './paymentRouter';


const router = express.Router();

router.use(bearerToken());
router.use(defineAbilities);


router.use('/user', userRouter);
router.use('/admin', adminRouter);
router.use('/contest', contestRouter);
router.use('/entries', entriesRouter);
router.use('/payment', paymentRouter);


module.exports = router;

