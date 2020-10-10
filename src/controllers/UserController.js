const {User} = require('../models/index');


class UserController {
    
    constructor(data) {
        this.data = data;
    }

    async create(){
       
        const result = await User.create({
            fullName : this.data.fullName, 
            userName : this.data.userName, 
            password : this.data.password
        });
        
        if(!result) return { status : 400 , message : "Something went wrong Please contact your support" };

        return { status : 200 , message : "Successfully Saved" ,data : result.dataValues };

    }
}

module.exports = UserController;