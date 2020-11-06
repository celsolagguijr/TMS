const express               = require('express');
const router                = express.Router();
const TransactionController = require("../controllers/TransactionController");
const Joi                   = require("@hapi/joi");
const {checkToken}          = require('../functions/jwt');
