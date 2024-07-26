class ErrorHandler extends Error{
    constructor(message,statuscode){
super(message)
this.statuscode = statuscode
    }
}


const errormiddleware = (err,req,res,next) =>{

err.message = err.message || "Internal Server error"
err.statuscode = err.statuscode || 500
if (err.name === "CastError") {
    const message = `Invalid: Resource not found: ${err.path}`;
    err = new ErrorHandler(message, 404);
  }

    res.status(err.statuscode).json({
        success:false,
        message:err.message
    })
    next()
}
module.exports = {ErrorHandler,errormiddleware}