const express               = require("express");
const router                = express.Router();
const DocumentController        = require("../controllers/DocumentController");
const Joi                   = require("@hapi/joi");
const {checkToken}          = require('../functions/jwt');


router.route("/documents")
    .get(checkToken , async (req,res) => {

        const document = new DocumentController(req.body);

        const data = await document.showAll();

        res.status(data.status).json({ 
                status : data.status, 
                data , 
                payload : req.payload 
            });

    });


router.route("/document")
    .post([checkToken,validateCreateDocument] , async (req,res) => {
        
        const document = new DocumentController({
            title           : req.body.title,
            description     : req.body.description,
            userId          : req.payload.id,
            documentTypeId  : req.body.documentTypeId
        });

        const data = await document.create();

        res.status(data.status).json({data});
        
    });

router.route("/document")
    .put([checkToken,validateEditDocument] , async (req,res) => {
        
        const document = new DocumentController({
            id              : req.body.id,
            title           : req.body.title,
            description     : req.body.description,
            documentTypeId  : req.body.documentTypeId
        });

        const data = await document.edit();

        res.status(data.status).json({data});
        
    });


function validateCreateDocument(req,res,next) {

    const schema = Joi.object({
        title    : Joi.string()
                      .required()
                      .label('Title'),
        description : Joi.string()
                      .label('Description')
                      .required(),
        documentTypeId : Joi.number()
                      .label('Document Type')
                      .required()
    });
    
    const {error} = Joi.validate(req.body, schema);
    
    if (error) return res.status(400).json({status : 400 , message : error.details[0].message})

    next();
}

function validateEditDocument(req,res,next) {

    const schema = Joi.object({
        id    : Joi.number()
                .required()
                .label('id'),
        title    : Joi.string()
                      .required()
                      .label('Title'),
        description : Joi.string()
                      .label('Description')
                      .required(),
        documentTypeId : Joi.number()
                      .label('Document Type')
                      .required()
    });
    
    const {error} = Joi.validate(req.body, schema);
    
    if (error) return res.status(400).json({status : 400 , message : error.details[0].message})

    next();
}

module.exports = router;