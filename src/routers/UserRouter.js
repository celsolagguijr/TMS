const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const Joi = require("@hapi/joi");
const {checkToken , verifyToken} = require('../functions/jwt');


router.route("/user/:id")
    .get(checkToken , async (req,res) => {

        try {

            const token = await verifyToken(req.token);

            const user = new UserController(req.params);

            const data = await user.show();

            res.status(data.status).json({

                status   : data.status,

                data : {
                    id       : data.user.id,
                    username : data.user.userName,
                    fullname : data.user.fullName,
                },

                token
            
            });

        } catch (error) {
            res.status(403).json({
                status : 403,
                message : "Forbidden",
                error 
            });
        }
    });


router.route("/user/signup")
    .post(validateSignUp,async (req,res)  => {

        const user = new UserController(req.body);
          
        const result = await user.create();

        res.status(result.status).json(result); 

    });

router.route("/user/login")
      .post(validateLogin,async (req,res) => {

        const user = new UserController(req.body);

        const result = await user.authenticate();

        res.status(result.status).json(result);


    });

function validateLogin(req,res,next){

    const schema = Joi.object({
        userName : Joi.string()
                      .required()
                      .label('User Name'),
        password : Joi.string()
                      .label('Password')
                      .required()
    }); 

    const {error} = Joi.validate(req.body, schema);

    if (error) return res.status(400).json({status : 400 , message : error.details[0].message});

    next();

}


function validateSignUp(req,res,next) {

    const schema = Joi.object({
        fullName : Joi.string()
                      .max(50)
                      .required()
                      .label('Full Name'),
        userName : Joi.string()
                      .label('User Name')
                      .required()
                      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password : Joi.string()
                      .label('Password')
                      .required(),
        confirmPassword : Joi.ref("password")
    });
    
    const {error} = Joi.validate(req.body, schema);
    
    if (error) return res.status(400).json({status : 400 , message : error.details[0].message})

    next();
}

module.exports = router;