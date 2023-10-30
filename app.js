console.log('Task Manager App')
const express=require('express');
// tasks route
const tasks=require('./routes/tasks');
const app=express();
const connectDB=require('./DB/connection');
// taking mongodb url from .env file
// dotenv file store all our secret variable
require('dotenv').config();
const notFound=require('./Middleware/not-found');
const errorHandlerMiddleware=require('./Middleware/error-handler');

// this middleware is inbuild in express
// without this middleware we can't get data in req
// to parse incoming JSON data from HTTP requests
app.use(express.json());

app.use('/api/v1/tasks',tasks);

app.use(express.static('./public'));

// handle all route
app.use(notFound);

// error handler middleware
app.use(errorHandlerMiddleware);

// if port no is not set then we will take 5000 as default one
const port=process.env.PORT || 5000

const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log(`server is listening on port ${5000}`));
    }
    catch(error){
        console.log(error);
    }
};

start();

// routes we need
// app.get('/api/v1/tasks')   ---get all the tasks
// app.post('/api/v1/tasks')  ---create a new task
// app.get('/api/v1/tasks/:id')   ----get single task
// app.patch('/api/v1/tasks/:id')  ---update task
// app.delete('/api/v1/tasks/:id')  ---delete task




