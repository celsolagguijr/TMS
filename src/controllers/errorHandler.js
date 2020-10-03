const fileRequestErrorHandler = (err,req,res,next) =>{
    if(err) res.status(404).json({status:404,message : "404 file not found.",error : err});
    next();
    return;
}



module.exports = { fileRequestErrorHandler };