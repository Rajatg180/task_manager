const Task=require('../models/Task');
const asyncWrapper=require('../Middleware/async_warapper');
const {createCustomError}=require('../errors/custom-error');

//waithout async wrapper

// const getAllTasks=async(req,res)=>{
//     try{
//         // get all tasks
//         const tasks=await Task.find({});
//         res.status(200).json({tasks});
//         // or
//         // res.status(200).jsosn({status:"sucess",data:{tasks,nbHits:tasks.length}});
//     }catch(err){
//         res.status(500).json({msg:err});
//     }
// };

// const createTask=async(req,res)=>{
//     try{
//        // task created in mongodb
//         const task=await Task.create(req.body);
//         res.status(201).json(task);
//     }
//     catch(err){
//         res.status(500).json({msg:err});
//     }
// };

// const getTask=async(req,res)=>{
//     try{
//         // get one task
//         const {id:taskId}=req.params;
//         const task=await Task.findOne({_id:taskId});
//         if(!task){
//             return res.status(404).json({msg:'No id matches'});
//         }
//         res.status(200).json({task});
//     }
//     catch(err){
//         res.status(500).json({msg:err});
//     }
// };



// const deleteTask=async(req,res)=>{
//     try{
//         // delete task
//         const {id:taskId}=req.params;
//         const task=await Task.findOneAndDelete({_id:taskId});

//         if(!task){
//             return res.status(404).json({msg:'No id matches'});
//         }

//         res.status(200).json({task});
//         // different syntax
//         // res.status(200).send();
//         // res.status(200).json({msg:null,status:'success'});

//     }
//     catch(err){
//         res.status(500).json({msg:err});
//     }
// };

// const updateTask=async(req,res)=>{
//     try{
//         const {id:taskId}=req.params;
        
//         // update task
//         // the third argument is required because to add validator 
//         // and new is requied bcoz it send us the odd task but we want the new task thats why new is required
//         const task = await Task.findOneAndUpdate({_id:taskId},req.body,{
//             new:true,
//             runValidators:true
//         });

//         if(!task){
//             return res.status(404).json({msg:'No id matches'});
//         }

//         res.status(200).json({task});
//     }
//     catch(err){
//         res.status(500).json({msg:err});
//     }
// }




// ****************************** with async warapper **********************

const getAllTasks=asyncWrapper(async(req,res)=>{
    // get all tasks
    const tasks=await Task.find({});
    res.status(200).json({tasks});
    // or
    // res.status(200).jsosn({status:"sucess",data:{tasks,nbHits:tasks.length}}); 
});

const createTask=asyncWrapper(async(req,res)=>{
    // task created in mongodb
    const task=await Task.create(req.body);
    res.status(201).json(task);
});

const getTask=asyncWrapper(async(req,res)=>{
    // get one task
    const {id:taskId}=req.params;
    const task=await Task.findOne({_id:taskId});
    if(!task){
        // custom error
        return next(createCustomError(  `No task with id ${taskId}`,404 ));       
        // return res.status(404).json({msg:'No id matches'});
    }
    res.status(200).json({task});
});

const deleteTask=asyncWrapper(async(req,res)=>{
    // delete task
    const {id:taskId}=req.params;
    const task=await Task.findOneAndDelete({_id:taskId});

    if(!task){
        next(createCustomError(  `No task with id ${taskId}`,404 ));  
    }

    res.status(200).json({task});
    // different syntax
    // res.status(200).send();
    // res.status(200).json({msg:null,status:'success'});
});



const updateTask=asyncWrapper(async(req,res,next)=>{
        const {id:taskId}=req.params;
        
        // update task
        // the third argument is required because to add validator 
        // and new is requied bcoz it send us the odd task but we want the new task thats why new is required
        const task = await Task.findOneAndUpdate({_id:taskId},req.body,{
            new:true,
            runValidators:true
        });

        if(!task){
            next(createCustomError(  `No task with id ${taskId}`,404 ));  
        }

        res.status(200).json({task});
   
});


module.exports={
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};
