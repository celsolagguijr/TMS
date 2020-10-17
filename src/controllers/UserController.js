const { User } = require('../models/index');
const { generateToken } = require("../functions/jwt");

const {hashPassword , checkPassword} =require("../functions/bcrypt");

class UserController {
    
    constructor(data) {
        this.data = data;
    }


    async show(){

        const user = await User.findOne({
            attributes : ['id','userName','fullName'],
            where      : { id : this.data.id }
        });

        return {status : 200 , user};
    }

    async create(){
        
        //check if the username is already taken
        const isUsernameTaken = await User.findOne({ where: { userName : this.data.userName } });

        if(isUsernameTaken) return { status : 409 , message : "Username is already taken!" };

        //save user
        const result = await User.create({
            fullName : this.data.fullName, 
            userName : this.data.userName, 
            password : this.data.password
        });
        

        //trap error
        if(!result) return { status : 400 , message : "Something went wrong Please contact your support" };

        //get TOKEN after saving into database
       
        const token = await generateToken({
            id : result.id,
            userName : result.userName,
            fullName : result.fullName
        });

        
        //return success message
        return { status : 201 , message : "Successfully Saved" , token };

    }

    async authenticate(){

        const user = await User.findOne({
            attributes : ['id','userName', 'password','fullName'],
            where      : { userName : this.data.userName }
        })

        if(!user){
            return { status :400  , message : "Incorrect Credentials"};
        }
        

        if(!await checkPassword(this.data.password,user.password)){
            return { status :400  , message : "Incorrect Credentials"};
        }

        const token = await generateToken({
            id       : user.id,
            userName : user.userName,
            fullName : user.fullName
        });


        return { status : 200 , message : "Successfully Login" , token };
    }

}

module.exports = UserController;