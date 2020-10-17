const express = require("express");
const jwt     = require("jsonwebtoken");
const app     = express();


app.get("/api",(req,res)=>{
    res.json({
        message : "index"
    })
})


app.post("/api/posts",verifyToken,(req,res)=>{

    jwt.verify(req.token, "mysecretkey" , (err,authData) =>{

        if(err){
            res.json({status : 403, message : "Forbidden"})
        }else{
            res.json({
                message : "postssss",
                authData
            });
        
        }
    })
});


app.post("/api/login",async (req,res) =>{

    const user = {
        id : 1,
        username : "sample@yahoo.com",
        fullName : "Celso Laggui JR" 
    }

    res.json({token : await generateToken(user)});


});



generateToken = async (payload) =>{
    return await jwt.sign({payload},"mysecretkey", {expiresIn : '1d'});
} 


function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== "undefined"){

        const bearer = bearerHeader.split(" ");

        const token = bearer[1];

        req.token = token;

        next();

    }else{
        res.json({status : 403, message : "Forbidden"});
    }
}

app.listen(3000, () => console.log(3000));

