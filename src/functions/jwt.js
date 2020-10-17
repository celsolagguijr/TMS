const jwt     = require("jsonwebtoken");
require('dotenv').config

generateToken = async (payload) =>{
    return await jwt.sign({payload},process.env.SECRET_KEY, {expiresIn : '1d'});
} 

verifyToken = async (token) =>{
    return await jwt.verify(token, process.env.SECRET_KEY);
}

function checkToken(req,res,next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== "undefined"){

        const bearerToken = bearerHeader.split(" ")[1];

        req.token = bearerToken;
        next();

    }else{
        res.json({status : 403, message : "Forbidden"});
    }
}


module.exports = {generateToken , checkToken ,verifyToken};