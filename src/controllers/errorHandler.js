const fileRequestErrorHandler = (err,req,res,next) =>{
    if(err) res.status(404).json({status:404,message : "404 file not found.",error : err});
    next();
    return;
}


const errorOccured = (status) =>{
    const statusCodes = [400,409,415];
    return statusCodes.includes(status) ? true : false;
}

module.exports = { fileRequestErrorHandler , errorOccured };