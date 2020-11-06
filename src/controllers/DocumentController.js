const { Document , DocumentType ,  User} = require('../models/index');

class DocumentController {

    constructor(data) {
        this.data = data;
    }

   async create(){

        try {
            
            const result = await Document.create({
                title           : this.data.title,
                description     : this.data.description,
                userId          : this.data.userId,
                documentTypeId  : this.data.documentTypeId
            });

            return { status : 201 , message : "Successfully Saved" , data : result };

        } catch (error) {

            return { status : 400 , message : "Something went wrong please contact your report" , error : error };

        }

    }

    async edit(){

        try {

            const result = await Document.update(
                { 
                    title : this.data.title,
                    description : this.data.description,
                    documentTypeId : this.data.documentTypeId
                }, 
                {
                    where: {
                        id : this.data.id
                    }
                });

            return { status : 200 , message : "Successfully Changed!" , data : this.data }

        } catch (error) {

             return { status : 400 , message : "Something went wrong please contact your report" , error : error };

        }

    }

    // show(){

    // }

    async showAll(){

        const documents = await Document.findAll({ 
                attributes : ["id","title","description","userId","DocumentTypeId"],
                include: [
                            { 
                                model : DocumentType , 
                                attributes : ['description']
                            },
                            {
                                model : User,
                                attributes : ["fullName","userName","profilePicture"]
                            }
                        
                        ]
            });

        return { status : 200 , documents }

    }



}


module.exports = DocumentController;