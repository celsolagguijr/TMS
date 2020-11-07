const express               = require("express");
const router                = express.Router();
const UserController        = require("../controllers/UserController");
const Joi                   = require("@hapi/joi");
const {checkToken}          = require('../functions/jwt');
const { checkFileUpload }   = require("../middlewares/fileUploadMiddleware");

router.route("/users")
    .get(checkToken , async (req,res) => {

        const user = new UserController(req.params);

        const data = await user.showAll();

        res.status(data.status).json({ 
                status : data.status, 
                data : data.users, 
                payload : req.payload 
            });

    });


router.route("/user/:id")
    .get(checkToken , async (req,res) => {

        const user = new UserController(req.params);

        const data = await user.show();

        res.status(data.status).json({
            status   : data.status,
            data : {
                id       : data.user.id,
                username : data.user.userName,
                fullname : data.user.fullName,
            },
            payload : req.payload
        });
    });


router.route("/user/signup")
    .post(validateSignUp,async (req,res)  => {

        const user = new UserController(req.body);
          
        const result = await user.create();

        res.status(result.status).json(result); 

    });

router.route("/user/login")
      .post(validateLogin,async (req,res) => {

        console.log(req.body)

        const user = new UserController(req.body);

        const result = await user.authenticate();

        res.status(result.status).json(result);

    });


router.route("/user/edit")
    .put([checkToken,validateEdit],async (req,res)=>{

        const user = new UserController(req.body);

        const result = await user.edit();

        res.status(result.status).json({result , payload : req.payload});

    });


router.route("/user/change-password")
    .put([checkToken,validateChangePassword],async (req,res)=>{

        const user = new UserController(req.body);

        const result = await user.changePassword();

        res.status(result.status).json({result , payload : req.payload});

    });


router.route("/user/change-profile-picture")
    .put([checkToken,checkFileUpload] , async (req,res) => {

        const user = new UserController({id : req.userid , profilePicture : req.fileUrl});
          
        const result = await user.updateProfilePicture();

        res.status(result.status).json(result);
    });



function validateChangePassword(req,res,next){

    const schema = Joi.object({
        id       : Joi.number().required(),
        currentPassword : Joi.string()
                            .label('Current Password')
                            .required(),
        newPassword     : Joi.string()
                            .label('New Password')
                            .required(),
        confirmPassword : Joi.ref("newPassword")


    }); 

    const {error} = Joi.validate(req.body, schema);

    if (error) return res.status(400).json({status : 400 , message : error.details[0].message});

    next();
}
    


function validateEdit(req,res,next){

    const schema = Joi.object({
        id       : Joi.number().required(),
        userName : Joi.string()
                      .required()
                      .label('User Name')
                      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        fullName : Joi.string()
                      .max(50)
                      .required()
                      .label('Full Name'),

    }); 

    const {error} = Joi.validate(req.body, schema);

    if (error) return res.status(400).json({status : 400 , message : error.details[0].message});

    next();
}

function validateLogin(req,res,next){

    const schema = Joi.object({
        userName : Joi.string()
                      .required()
                      .label('User Name')
                      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
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