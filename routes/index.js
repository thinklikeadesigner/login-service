/* eslint-disable linebreak-style */
const express = require('express');

const rootRouter = express.Router();


const userRouter = require('./users');

const authRouter = require('./authroute');

rootRouter.use(userRouter);

rootRouter.use(authRouter);
module.exports = rootRouter;
