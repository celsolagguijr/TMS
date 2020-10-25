const { User } = require('../models/index');
const { generateAccessToken , generateRefrehToken } = require("../functions/jwt");
const { hashPassword ,checkPassword} = require("../functions/bcrypt");


class UserController {
    
    constructor(data) {
        this.data = data;
    }

    async showAll(){

        const users = await User.findAll({ attributes: { exclude: ['password'] } });

        return { status : 200 , users }
    }


    async show(){

        const user = await User.findOne({
            attributes : ['id','userName','fullName'],
            where      : { id : this.data.id }
        });

        return await {status : 200 , user};
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
        const access_token = await generateAccessToken({
            id : result.id,
            userName : result.userName,
            fullName : result.fullName
        });


        const refresh_token = await generateRefrehToken({
            id : result.id
        });

        
        //return success message
        return { status : 201 , message : "Successfully Saved" , access_token , refresh_token };

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

        const access_token = await generateAccessToken({
            id : user.id,
            userName : user.userName,
            fullName : user.fullName
        });


        const refresh_token = await generateRefrehToken({
            id : user.id
        });


        return { status : 200 , message : "Successfully Login" , access_token ,  refresh_token };
    }


    async edit (){

        const user = await User.findOne({
            attributes : ['id'],
            where      : { userName : this.data.userName }
        });

        if(user){

            if(user.id != this.data.id)
                return { status : 403 , message : "Username is already taken!" }

        }


        try {

            const result = await User.update(
                { 
                    fullName : this.data.fullName,
                    userName : this.data.userName
                }, 
                {
                    where: {
                        id : this.data.id
                    }
                });

            
            return { status : 200 , message : "Successfully Changed!" , data : this.data }

            
        } catch (error) {
            return { status : 400 , error }
        }

    }


    async changePassword(){


        const user = await User.findOne({
            attributes : ['password'],
            where      : { id : this.data.id }
        })


        if(!await checkPassword(this.data.currentPassword,user.password)){
            return { status :400  , message : "Incorrect Password"};
        }


        try {

            const result = await User.update(
                { 
                    password : await hashPassword(this.data.newPassword),
                }, 
                {
                    where: {
                        id : this.data.id
                    }
                });

            
            return { status : 200 , message : "Password successfully changed!" }

            
        } catch (error) {
            return { status : 400 , error }
        }
    }

    async updateProfilePicture(){

        try {

            const result = await User.update(
                { 
                    profilePicture : this.data.profilePicture,
                }, 
                {
                    where: {
                        id : this.data.id
                    }
                });

            
            return { status : 200 , message : "Profile successfully Changed!" }

            
        } catch (error) {
            return { status : 400 , error }
        }

    }

}

module.exports = UserController;