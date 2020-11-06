const jwt     = require("jsonwebtoken");
require('dotenv').config
const {User} = require("../models/index")


generateAccessToken = async (payload) =>{
    return await jwt.sign({payload},process.env.SECRET_KEY_ACCESS_TOKEN, {expiresIn : '1m'});
} 

generateRefrehToken = async (payload) => {
    return await jwt.sign({payload},process.env.SECRET_KEY_REFRESH_TOKEN, {expiresIn : '2d'});
}

verifyAccessToken = async (token) =>{
    return await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
}

verifyRefreshToken = async (token) =>{
    return await jwt.verify(token, process.env.SECRET_KEY_REFRESH_TOKEN);
}



checkToken = async (req,res,next) => {

    const bearerHeader = req.headers['authorization'];
    const refreshToken = req.headers['x-refresh-token'];

    if(typeof bearerHeader !== "undefined" && typeof refreshToken !== "undefined"){

        const accessToken = bearerHeader.split(" ")[1];

        try {

            const token = await verifyAccessToken(accessToken);

            req.payload = token.payload;

        } catch (error) {


            try {
                
                const refresh_token = await verifyRefreshToken(refreshToken);

                const user = await User.findOne({
                    attributes : ['id','userName','fullName'],
                    where      : { id : refresh_token.payload.id }
                });
                
                 const newAccessToken = await generateAccessToken (user);
                 
                 const tokenPayload = await verifyAccessToken(newAccessToken);

                req.payload = tokenPayload.payload;
                
                res.set("Access-Control-Request-Headers", 'x-new-access-token');

                res.set("x-new-access-token'", newAccessToken);

            } catch (error) {

                res.status(403).json({
                    status : 403,
                    message : "Unauthorize",
                    error 
                });
            }
        }


       next();

    }else{
        res.json({status : 403, message : "Unauthorize"});
    }
}


module.exports = { 
                    generateAccessToken , 
                    checkToken , 
                    verifyAccessToken , 
                    verifyRefreshToken , 
                    generateRefrehToken
                };