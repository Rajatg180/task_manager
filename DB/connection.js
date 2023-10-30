const moongoose=require('mongoose');

// deprecation warning
const connectionParams={
    useNewUrlParser:true,
    useCreateIndex: true,
    useFindAndModify:false,
    useUnifiedTopology: true,
};

// when there is connection with db then only we will spinup our server
const connectDB=(url)=>{
    return moongoose.connect(url,connectionParams);
};

// moongoose.connect(connectionString,connectionParams).then(()=>{
//     console.log("Connected to db");
// })
// .catch((e)=>{
//     console.log(`error : ${e}`);
// });

module.exports=connectDB;