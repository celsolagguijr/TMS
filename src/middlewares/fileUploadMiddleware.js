
const formidable  = require('formidable'); //module for file Upload
const bluebird    = require('bluebird'); //use for asynchronous file system
const fs          = bluebird.promisifyAll(require('fs'));
const { join }    = require("path");
const imgUrl      = "http://localhost:3000/img/";



checkFileValidity = async (fileType) => {
  
    const validTypes = ['jpg','png','jpeg'];
    
    if(validTypes.indexOf(fileType) == -1){
      console.log("File type is not acceptible");
      return false;
    }
    
    return true;
    
}



checkFileDir = async (dir) =>{
  
    try {

      //check if the file upload directory is existing
      await fs.statAsync(dir)
      
    } catch (error) {

    //if file dir is not exist make a dir from the give dir
      if(error && error.code == "ENOENT"){
        
        try {
          
          await fs.mkdirAsync(dir)
          
        } catch (error) {
          
          console.log("Error:", error);
          return false;
          
        }
        
      } else {
  
        console.log("Error :", error);
        return false;

      }
      
    }
    
    return true;
    
}


addTimeStamp = async (filaName) =>{

  const slicedFileName = filaName.split('.');
  const filaNameWithTimeStamp = slicedFileName[0] + Date.now().toString();
  return filaNameWithTimeStamp +"."+ slicedFileName[1];

}


checkFileUpload = async (req,res,next) => {

  const uploadFolderPath = join(__dirname,"../../",'public','img'); //upload directory

  const form = formidable.IncomingForm();

  //formidable setting
  form.multiples = true; //multiple uploads
  form.maxFileSize = 3 * 1024 * 1024 ; // 3mb file size
  form.uploadDir = uploadFolderPath; // file dir to upload

  const fileDirCheck = await checkFileDir (uploadFolderPath); //check if dir exist

  if(!fileDirCheck) {
    res.status(400).json({status : 400 , message : "Error in creating of file upload directory"});
    return;
  }
  //
  
  form.parse(req, async (err, fields, files) => {  //parsing files uploaded

    const uploadedFiles = files.files;

    if (!uploadedFiles || (uploadedFiles.size == 0)) { //if file/s not found
      res.status(400).json({status : 400 , message : "File\/s is required."});
      return;
    }

    if(err) { //if parse detects error
      res.status(400).json({status : 400 , message : "File size exceeds the allowable limit (3mb)"});
      return;
    } 

    
    const file = uploadedFiles; //get the file
    const isValid = await checkFileValidity(file.type.split('/')[1]);  //check if the file type is valid

    if(!isValid){
      res.status(400).json({status : 400 , message : file.name + " is not acceptible"});
      return;
    }
    
    const preRenameFile = encodeURIComponent(file.name.replace(/&. *;+/g,'-'));// +   //prename

    const fileName = await addTimeStamp(preRenameFile);
    
    try { //move the file into the dir

        await fs.renameAsync(file.path, join(uploadFolderPath,await fileName)); //move file!

        //pass data into request
        req.userid = fields.id;
        req.fileUrl = (imgUrl + await fileName);

    } catch (error) {

        try { await fs.unlinkAsync(file.path) } catch (e) { } //remove temp file if error occured
        res.status(400).json({ status : 400 , message : "File cannot be uploaded"});
        return;

    }
            
    next();

  });
  
}


checkMultipleFileUpload = async (req,res,next) => {

  //upload directory
  const uploadFolderPath = join(__dirname,"../../",'public','img');

  const form = formidable.IncomingForm();

  //formidable setting
  form.multiples = true; //multiple uploads
  form.maxFileSize = 3 * 1024 * 1024 ; // 3mb file size
  form.uploadDir = uploadFolderPath; // file dir to upload

  //check if dir exist
  const fileDirCheck = await checkFileDir (uploadFolderPath);

  if(!fileDirCheck) {
    res.status(400).json({status : 400 , message : "Error in creating of file upload directory"});
    return;
  }
  //

  //parsing files uploaded
  form.parse(req, async (err, fields, files) => { 

    const uploadedFiles = files.files;

    //if file/s not found
    if (!uploadedFiles || (uploadedFiles.size == 0)) {
      res.status(400).json({status : 400 , message : "File\/s is required."});
      return;
    }

    //if parse detects error
    if(err) {
      res.status(400).json({status : 400 , message : "File size exceeds the allowable limit (3mb)"});
      return;
    } 


    for (let i = 0; i < uploadedFiles.length; i++) {
        
      const file = uploadedFiles[i]; //get the file
      
      const isValid = await checkFileValidity(file.type.split('/')[1]); //check if the file type is valid

      if(!isValid){
        errorOccured = true;
        res.status(400).json({status : 400 , message : file.name + " is not acceptible" });
        return;
      }

    }


    //if no errors upload the files

    let filesUploaded = [];

    for (let i = 0; i < uploadedFiles.length; i++) {
        
      const file = uploadedFiles[i]; //get the file

      const preRenameFile = encodeURIComponent(file.name.replace(/&. *;+/g,'-'));// +   //prename

      const fileName = await addTimeStamp(preRenameFile);
  
      await fs.renameAsync(file.path, join(uploadFolderPath,await fileName)); //move file
      //add 
      filesUploaded.push(imgUrl + await fileName);

    }


    req.userid = fields.id;
    req.filesUploaded = filesUploaded;

    next();

  });
} 


module.exports = {checkMultipleFileUpload , checkFileUpload} ;