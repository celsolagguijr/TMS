const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const Joi = require("@hapi/joi");

router.route("/user")
      .get((req,res) =>{
        res.status(200).send("GET method");
      })
      .post(validation,async (req,res)  => {

        const user = new UserController(req.body);
        
        const result = await user.create();

       if(result.status == 400)  res.status(400).json(result);
            
        res.status(200).send(result);
            
    });



function validation(req,res,next) {

    const schema = Joi.object({
        fullName : Joi.string().max(50).required(),
        userName : Joi.string().max(30).required(),
        password : Joi.string().max(30).required()
    });
    
    const {error} = Joi.validate(req.body, schema);

    if (error) return res.status(400).send(error.details[0].message);

    next();
}

module.exports = router;