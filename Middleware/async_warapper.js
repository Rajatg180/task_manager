// this is middlware for try and catch 

const asyncWrapper=(fn)=>{
    return async (req,res,next)=>{
        try{
            await fn(req,res,next);
        }
        catch(err){
            next(err);
        }
    }
};

module.exports=asyncWrapper;