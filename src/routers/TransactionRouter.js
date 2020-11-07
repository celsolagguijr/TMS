const express               = require('express');
const router                = express.Router();
const TransactionController = require("../controllers/TransactionController");
const Joi                   = require("@hapi/joi");
const {checkToken}          = require('../functions/jwt');


router.route("/transaction")
        .post([checkToken,validateTransaction], async(req,res)=>{


            console.log(req.payload.id)

            const transaction = new TransactionController({
                userId : req.payload.id,
                documentId : req.body.documentId,
                transactionStatus : req.body.transactionStatus,
                remarks : req.body.remarks,
            });
    
            const data = await transaction.create();
    
            res.status(data.status).json({data});

        });


function validateTransaction(req,res,next) {

    const schema = Joi.object({
        documentId  : Joi.number()
                      .required()
                      .label('documentId'),
        transactionStatus : Joi.string()
                      .label('transactionStatus')
                      .required(),
        remarks : Joi.string()
                      .label('remarks')
                      .required(),     
    });
    
    const {error} = Joi.validate(req.body, schema);
    
    if (error) return res.status(400).json({status : 400 , message : error.details[0].message})

    next();
}

module.exports = router;