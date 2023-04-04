const {CustomAPIError} = require('../error/custom-error')

const errorHandlerMiddleware =(err,req,res,next)=>{
    if(err instanceof CustomAPIError){
        return res.status(err.stack).json({msg : err.message})
    }
    return res.status(500).json({msg:'something wrong,try again later'})
}
module.exports = errorHandlerMiddleware