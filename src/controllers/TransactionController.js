const { Transaction } = require('../models/index');

class TransactionController {

    constructor(data) {
        this.data = data;
    }
    

    async create (){
        
        try {
            
            const result = Transaction.create({
                userId : this.data.userId,
                documentId : this.data.documentId,
                transactionStatus : this.data.transactionStatus,
                remarks : this.data.remarks
            });

            //return success message
            return { status : 201 , message : "Successfully Saved" };

        } catch (error) {
            return { status : 400 , message : "Something went wrong Please contact your support" , error };

        }
     
    } 

}

module.exports= TransactionController;