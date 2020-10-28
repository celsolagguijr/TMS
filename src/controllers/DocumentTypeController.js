const { DocumentType } = require('../models/index');

class DocumentTypeController {
    
    constructor(data) {
        this.data = data;
    }

    async create (){

        const result = await DocumentType.create({
            description : this.data.description
        });

        //trap error
        if(!result) return { status : 400 , message : "Something went wrong Please contact your support" };

        //return success message
        return { status : 201 , message : "Successfully Saved" , data : result };
    }

    async showAll (){

        const DocumentTypes = await DocumentType.findAll();

        return { status : 200 , DocumentTypes }
    }

    async edit (){

        try {

            const result = await DocumentType.update(
                { 
                    description : this.data.description
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
    
}


module.exports = DocumentTypeController;