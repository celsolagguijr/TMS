const { Transaction } = require('../models/index');

class Transaction {

    constructor(data) {
        this.data = data;
    }
    

    async create (){
        
        try {
            
            const result = Transaction.create({
                UserId : this.data.UserId,
                documebtId : this.data.documebtId,
                transactionStatus : this.data.transactionStatus,
                remarks : this.data.remarks
            });

            //return success message
            return { status : 201 , message : "Successfully Saved" , result };

        } catch (error) {
            return { status : 400 , message : "Something went wrong Please contact your support" , error };

        }
     
    } 

}