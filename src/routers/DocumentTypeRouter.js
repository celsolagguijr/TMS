const express               = require("express");
const router                = express.Router();
const DocumentTypeController        = require("../controllers/DocumentTypeController");
const Joi                   = require("@hapi/joi");
const {checkToken}          = require('../functions/jwt');

router.route('/document-type')
    .post([checkToken,validate], async (req,res)=>{

        const documentType = new DocumentTypeController(req.body);
          
        const result = await documentType.create();

        res.status(result.status).json(result); 

    });


router.route('/document-types')
    .get([checkToken], async (req,res)=>{

        const documentTypes = new DocumentTypeController(req.body);
          
        const result = await documentTypes.showAll();

        res.status(result.status).json(result); 

    });

router.route('/document-type')
    .put([checkToken,validateEdit], async (req,res)=>{

        const documentTypes = new DocumentTypeController(req.body);
          
        const result = await documentTypes.edit();

        res.status(result.status).json(result); 

    });


function validate(req,res,next) {

    const schema = Joi.object({
        description : Joi.string()
                      .max(50)
                      .required()
                      .label('Description')
    });
    
    const {error} = Joi.validate(req.body, schema);
    
    if (error) return res.status(400).json({status : 400 , message : error.details[0].message})

    next();
}


function validateEdit(req,res,next) {

    const schema = Joi.object({
        id       : Joi.number().required(),
        description : Joi.string()
                      .max(50)
                      .required()
                      .label('Description')

    });

    const {error} = Joi.validate(req.body, schema);
    
    if (error) return res.status(400).json({status : 400 , message : error.details[0].message})

    next();
}

module.exports = router;